const ErrorResponse = require("../utils/errorResponse");
const pool = require("../config/db");
const { db } = require("@db/index");

const getByIdWorkerTaskService = async (
  batalon_id,
  worker_task_id,
  user_id,
  lang
) => {
  try {
    const result = await pool.query(
      `--sql
            SELECT w_t.id 
            FROM worker_task AS w_t
            JOIN task AS t ON t.id = w_t.task_id
            JOIN contract AS c ON c.id = t.contract_id 
            WHERE t.batalon_id = $1
                AND w_t.id = $2
                AND t.user_id = $3
                AND w_t.isdeleted = false
                AND t.isdeleted = false
                AND  0 = (SELECT (c.result_summa - COALESCE(SUM(summa), 0))::FLOAT FROM prixod WHERE isdeleted = false AND contract_id = c.id)
                AND  NOT EXISTS (SELECT * FROM rasxod_fio WHERE isdeleted = false AND worker_task_id = w_t.id)
        `,
      [batalon_id, worker_task_id, user_id]
    );

    if (!result.rows[0]) {
      throw new ErrorResponse(lang.t("docNotFound"), 404);
    }

    return result.rows[0];
  } catch (error) {
    throw new ErrorResponse(error, error.statusCode);
  }
};

const paymentRequestService = async (account_number, batalon_id, from, to) => {
  try {
    const result = await pool.query(
      `--sql
            SELECT 
                w_t.id AS worker_task_id,
                c.doc_num AS contract_doc_num,
                c.doc_date AS contract_doc_date,
                o.name AS organization_name,
                o.address AS organization_address,
                o.str AS organization_str,
                o.bank_name AS organization_bank_name,
                o.mfo AS organization_mfo,
                o.account_number AS organization_account_number,
                w.fio,
                ROUND(w_t.task_time::numeric, 2)::FLOAT AS task_time,
                w_t.summa::FLOAT
            FROM worker_task AS w_t
            JOIN task AS t ON t.id = w_t.task_id
            JOIN worker AS w ON w_t.worker_id = w.id
            JOIN contract AS c ON c.id = t.contract_id
            JOIN organization AS o ON o.id = c.organization_id
            WHERE c.account_number_id = $1  
                AND c.doc_date BETWEEN $2 AND $3 
                AND t.batalon_id = $4 
                AND c.isdeleted = false
                AND w_t.isdeleted = false
                AND t.isdeleted = false
                AND  0 >= (
                        SELECT 
                            (c.result_summa - COALESCE(SUM(p.summa), 0))::FLOAT 
                        FROM prixod p
                        WHERE p.isdeleted = false 
                            AND p.contract_id = c.id
                    )
                AND  NOT EXISTS (
                        SELECT 1 
                        FROM rasxod_fio rf 
                        WHERE rf.isdeleted = false 
                            AND rf.worker_task_id = w_t.id
                    )
        `,
      [account_number, from, to, batalon_id]
    );

    return result.rows;
  } catch (error) {
    throw new ErrorResponse(error, error.statusCode);
  }
};

const createRasxodDocService = async (data) => {
  const client = await pool.connect();
  try {
    await client.query(`BEGIN`);
    const rasxod_fio_doc = await client.query(
      `
            INSERT INTO rasxod_fio_doc(
                doc_num, 
                doc_date, 
                batalon_id, 
                user_id, 
                opisanie, 
                account_number_id, 
                "from",
                "to",
                batalon_account_number_id, 
                batalon_gazna_number_id
            ) 
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
            RETURNING * 
        `,
      [
        data.doc_num,
        data.doc_date,
        data.batalon_id,
        data.user_id,
        data.opisanie,
        data.account_number_id,
        data.from,
        data.to,
        data.batalon_account_number_id,
        data.batalon_gazna_number_id,
      ]
    );

    const rasxod_fio = rasxod_fio_doc.rows[0];

    const queryArray = [];

    const deductionQueryArray = [];

    for (let worker_task of data.worker_tasks) {
      let worker_task_summa = await client.query(
        `SELECT summa FROM worker_task WHERE id = $1`,
        [worker_task.worker_task_id]
      );
      worker_task_summa = worker_task_summa.rows[0].summa;
      let summa = worker_task_summa;
      for (let element of data.deductions) {
        let percent = element.percent / 100;
        summa = summa - summa * percent;
      }
      summa = Math.round(summa * 100) / 100;
      queryArray.push(
        client.query(
          `
                INSERT INTO rasxod_fio(worker_task_id, rasxod_fio_doc_id, summa)
                VALUES($1, $2, $3) RETURNING *`,
          [worker_task.worker_task_id, rasxod_fio.id, summa]
        )
      );
    }
    for (let deduction of data.deductions) {
      deductionQueryArray.push(
        client.query(
          `INSERT INTO rasxod_fio_deduction(deduction_id, rasxod_fio_doc_id) VALUES($1, $2) RETURNING *`,
          [deduction.id, rasxod_fio.id]
        )
      );
    }
    const rasxods = await Promise.all(queryArray);
    const deductions = await Promise.all(deductionQueryArray);
    rasxod_fio.tasks = rasxods.map((item) => item.rows[0]);
    rasxod_fio.deductions = deductions.map((item) => item.rows[0]);
    await client.query(`COMMIT`);
    return rasxod_fio;
  } catch (error) {
    await client.query(`ROLLBACK`);
    throw new ErrorResponse(error, error.statusCode);
  } finally {
    client.release();
  }
};

const getRasxodService = async (
  user_id,
  account_number_id,
  from,
  to,
  offset,
  limit,
  batalon_id
) => {
  try {
    const params = [account_number_id, from, to, user_id, offset, limit];
    let batalon_filter = ``;
    if (batalon_id) {
      batalon_filter = ` AND d.batalon_id = $${params.length + 1}`;
      params.push(batalon_id);
    }
    const result = await pool.query(
      `--sql
            WITH data AS (
                SELECT 
                    d.id,
                    d.doc_num,
                    TO_CHAR(d.doc_date, 'YYYY-MM-DD') AS doc_date,  -- Yil, oy, kun formatini to'g'ri ko'rsatish
                    d.opisanie,
                    b.id AS batalon_id,
                    b.name AS batalon_name,
                    b.address AS batalon_address,
                    b.str AS batalon_str,
                    b.bank_name AS batalon_bank_name,
                    b.mfo AS batalon_mfo,
                    d.batalon_gazna_number_id,
                    d.batalon_account_number_id,
                    g.gazna_number,
                    a.account_number,
                    (
                        SELECT COALESCE(SUM(wt.summa), 0) AS summa
                        FROM rasxod_fio AS r
                        JOIN worker_task wt ON wt.id = r.worker_task_id
                        WHERE r.rasxod_fio_doc_id = d.id AND r.isdeleted = false
                    ) AS summa,
                    b.name AS batalon_name
                FROM rasxod_fio_doc AS d
                JOIN batalon AS b ON b.id = d.batalon_id 
                LEFT JOIN account_number a ON a.id = d.batalon_account_number_id 
                LEFT JOIN gazna_numbers g ON g.id = d.batalon_gazna_number_id
                WHERE d.account_number_id = $1 
                AND d.isdeleted = false
                AND d.doc_date BETWEEN $2 AND $3
                AND d.user_id = $4 ${batalon_filter} AND d.isdeleted = false
                OFFSET $5 LIMIT $6
            )
            SELECT 
                ARRAY_AGG(ROW_TO_JSON(data)) AS data,
                (
                    SELECT COALESCE(COUNT(id), 0)::INTEGER  
                    FROM rasxod_fio_doc AS d 
                    WHERE d.account_number_id = $1 
                    AND d.doc_date BETWEEN $2 AND $3 
                    AND d.user_id = $4 ${batalon_filter} AND d.isdeleted = false
                ) AS total_count,
                (
                    SELECT 
                      COALESCE(SUM(wt.summa), 0)::FLOAT AS summa
                    FROM rasxod_fio AS r
                    JOIN worker_task wt ON wt.id = r.worker_task_id
                    JOIN rasxod_fio_doc AS d ON d.id = r.rasxod_fio_doc_id
                    WHERE r.isdeleted = false AND d.doc_date < $2  AND d.isdeleted = false ${batalon_filter} AND d.isdeleted = false
                ) AS summa_from,
                 (
                    SELECT 
                      COALESCE(SUM(wt.summa), 0)::FLOAT AS summa
                    FROM rasxod_fio AS r
                    JOIN worker_task wt ON wt.id = r.worker_task_id
                    JOIN rasxod_fio_doc AS d ON d.id = r.rasxod_fio_doc_id
                    WHERE r.isdeleted = false AND d.doc_date < $3  AND d.isdeleted = false ${batalon_filter} AND d.isdeleted = false
                ) AS summa_to
            FROM data
        `,
      params
    );
    return {
      data: result.rows[0]?.data || [],
      total: result.rows[0].total_count,
      summa_from: result.rows[0].summa_from,
      summa_to: result.rows[0].summa_to,
    };
  } catch (error) {
    throw new ErrorResponse(error, error.statusCode);
  }
};

const getByGroupTasks = async (params) => {
  const query = `--sql
    SELECT
      w.id AS worker_id,
      COALESCE(SUM(w_t.task_time), 0)::FLOAT AS task_time,
      COALESCE(SUM(w_t.summa), 0)::FLOAT AS summa,
      COALESCE(SUM(w_t.summa - r.summa), 0)::FLOAT AS deduction_money,
      COALESCE(SUM(r.summa), 0)::FLOAT  AS result_summa,
      w.account_number,
      w.xisob_raqam,
      w.fio
    FROM rasxod_fio AS r 
    LEFT JOIN worker_task AS w_t ON r.worker_task_id = w_t.id
    LEFT JOIN worker AS w ON w.id = w_t.worker_id
    LEFT JOIN task AS t ON t.id = w_t.task_id 
    LEFT JOIN contract AS c ON c.id = t.contract_id
    LEFT JOIN organization AS o ON o.id = c.organization_id
    WHERE r.rasxod_fio_doc_id = $1
      AND r.isdeleted = false
    GROUP BY 
      w.id,
      w.account_number,
      w.xisob_raqam,
      w.fio
  `;

  const result = await db.query(query, params);

  return result;
};

const getByIdRasxodService = async (
  user_id,
  account_number_id,
  id,
  ignore = false,
  lang
) => {
  try {
    let ignore_filter = ``;
    if (!ignore) {
      ignore_filter = `AND d.isdeleted = false`;
    }

    const data = await pool.query(
      `--sql
            SELECT 
                d.id,
                d.doc_num,
                TO_CHAR(d.doc_date, 'YYYY-MM-DD') AS doc_date,
                d.opisanie,
                b.id AS batalon_id,
                b.name AS batalon_name,
                b.address AS batalon_address,
                b.str AS batalon_str,
                b.bank_name AS batalon_bank_name,
                b.mfo AS batalon_mfo,
                d.batalon_gazna_number_id,
                d.batalon_account_number_id,
                g.gazna_number,
                a.account_number,
                TO_CHAR(d.from, 'YYYY-MM-DD') AS from,
                TO_CHAR(d.to, 'YYYY-MM-DD') AS to,
                (
                    SELECT COALESCE(SUM(r.summa), 0)::FLOAT AS summa
                    FROM rasxod_fio AS r
                    WHERE r.rasxod_fio_doc_id = d.id 
                ) AS summa,
                COALESCE((
                  SELECT
                    ARRAY_AGG(
                        JSON_BUILD_OBJECT(
                            'deduction_id', deduction.id, 
                            'deduction_name', deduction.name, 
                            'percent', deduction.percent
                        ) 
                        ORDER BY deduction.percent DESC
                    )
                  FROM rasxod_fio_deduction ch 
                  JOIN deduction ON deduction.id = ch.deduction_id 
                  WHERE ch.rasxod_fio_doc_id = d.id
                ), ARRAY[]::JSON[]) AS deductions,
                (
                    SELECT 
                        ARRAY_AGG(ROW_TO_JSON(task))
                    FROM (
                        SELECT 
                            c.doc_num AS contract_doc_num,
                            c.doc_date AS contract_doc_date,
                            o.name AS organization_name,
                            o.address AS organization_address,
                            o.str AS organization_str,
                            o.bank_name AS organization_bank_name,
                            o.mfo AS organization_mfo,
                            o.account_number AS organization_account_number,
                            w_t.id AS worker_task_id,
                            ROUND(w_t.task_time::numeric, 2) AS task_time,
                            w_t.summa,
                            ( w_t.summa - r.summa )::FLOAT AS deduction_money ,
                            r.summa::FLOAT  AS result_summa,
                            w.account_number,
                            w.xisob_raqam,
                            w.fio
                        FROM rasxod_fio AS r 
                        LEFT JOIN worker_task AS w_t ON r.worker_task_id = w_t.id
                        LEFT JOIN worker AS w ON w.id = w_t.worker_id
                        LEFT JOIN task AS t ON t.id = w_t.task_id 
                        LEFT JOIN contract AS c ON c.id = t.contract_id
                        LEFT JOIN organization AS o ON o.id = c.organization_id
                        WHERE r.rasxod_fio_doc_id = $3
                    ) AS task
                ) AS worker_tasks 
            FROM rasxod_fio_doc AS d
            LEFT JOIN batalon AS b ON b.id = d.batalon_id
            LEFT JOIN gazna_numbers g ON g.id = d.batalon_gazna_number_id
            LEFT JOIN account_number a ON a.id = d.batalon_account_number_id 
            WHERE d.account_number_id = $1 
                AND d.user_id = $2 
                AND d.id = $3  
                ${ignore_filter}
        `,
      [account_number_id, user_id, id]
    );

    if (!data.rows[0]) {
      throw new ErrorResponse(lang.t("docNotFound"), 404);
    }

    return data.rows[0];
  } catch (error) {
    throw new ErrorResponse(error, error.statusCode);
  }
};

const deeleteRasxodService = async (id) => {
  const client = await pool.connect();
  try {
    await client.query(`BEGIN`);
    await client.query(
      `UPDATE rasxod_fio SET isdeleted = true WHERE rasxod_fio_doc_id = $1 AND isdeleted = false`,
      [id]
    );
    await client.query(
      `UPDATE rasxod_fio_deduction SET isdeleted = true WHERE rasxod_fio_doc_id = $1 AND isdeleted = false`,
      [id]
    );
    await client.query(
      `UPDATE rasxod_fio_doc SET isdeleted = true WHERE id = $1 AND isdeleted = false`,
      [id]
    );
    await client.query(`COMMIT`);
  } catch (error) {
    await client.query(`ROLLBACK`);
    throw new ErrorResponse(error, error.statusCode);
  } finally {
    client.release();
  }
};

const updateRasxodService = async (data) => {
  const client = await pool.connect();
  try {
    await client.query(`BEGIN`);
    const rasxod_fio_doc = await client.query(
      `UPDATE rasxod_fio_doc SET 
            doc_num = $1, 
            doc_date = $2, 
            batalon_id = $3, 
            opisanie = $4,
            "from" = $5,
            "to" = $6,
            batalon_account_number_id = $7, 
            batalon_gazna_number_id = $8
            WHERE id = $9
            RETURNING * 
        `,
      [
        data.doc_num,
        data.doc_date,
        data.batalon_id,
        data.opisanie,
        data.from,
        data.to,
        data.batalon_account_number_id,
        data.batalon_gazna_number_id,
        data.id,
      ]
    );

    const rasxod_fio = rasxod_fio_doc.rows[0];

    await client.query(`DELETE FROM rasxod_fio WHERE rasxod_fio_doc_id = $1`, [
      data.id,
    ]);

    await client.query(
      `DELETE FROM rasxod_fio_deduction WHERE rasxod_fio_doc_id = $1`,
      [data.id]
    );

    const queryArray = [];

    const deductionQueryArray = [];
    for (let worker_task of data.worker_tasks) {
      let worker_task_summa = await client.query(
        `SELECT summa FROM worker_task WHERE id = $1`,
        [worker_task.worker_task_id]
      );
      worker_task_summa = worker_task_summa.rows[0].summa;
      let summa = worker_task_summa;

      for (let element of data.deductions) {
        let percent = element.percent / 100;
        summa = summa - summa * percent;
      }

      summa = Math.round(summa * 100) / 100;
      queryArray.push(
        client.query(
          `
                INSERT INTO rasxod_fio(worker_task_id, rasxod_fio_doc_id, summa)
                VALUES($1, $2, $3) RETURNING *`,
          [worker_task.worker_task_id, rasxod_fio.id, summa]
        )
      );
    }

    for (let deduction of data.deductions) {
      deductionQueryArray.push(
        client.query(
          `INSERT INTO rasxod_fio_deduction(deduction_id, rasxod_fio_doc_id) VALUES($1, $2) RETURNING *`,
          [deduction.id, rasxod_fio.id]
        )
      );
    }

    const rasxods = await Promise.all(queryArray);
    const deductions = await Promise.all(deductionQueryArray);
    rasxod_fio.tasks = rasxods.map((item) => item.rows[0]);
    rasxod_fio.deductions = deductions.map((item) => item.rows[0]);

    await client.query(`COMMIT`);
    return rasxod_fio;
  } catch (error) {
    await client.query(`ROLLBACK`);
    throw new ErrorResponse(error, error.statusCode);
  } finally {
    client.release();
  }
};

module.exports = {
  paymentRequestService,
  createRasxodDocService,
  getByIdWorkerTaskService,
  getRasxodService,
  getByIdRasxodService,
  deeleteRasxodService,
  updateRasxodService,
  getByGroupTasks,
};
