const ErrorResponse = require("../utils/errorResponse");
const pool = require("../config/db");

const getByIdTaskService = async (batalon_id, task_id, user_id, lang) => {
  try {
    const result = await pool.query(
      `
            SELECT t.id 
            FROM task AS t
            JOIN contract AS c ON c.id = t.contract_id 
            WHERE t.batalon_id = $1 
                AND t.id = $2 
                AND t.user_id = $3
                AND  0 = (SELECT (c.result_summa - COALESCE(SUM(summa), 0))::FLOAT FROM prixod WHERE isdeleted = false AND contract_id = c.id)
                AND  NOT EXISTS (SELECT * FROM rasxod WHERE isdeleted = false AND task_id = t.id)
        `,
      [batalon_id, task_id, user_id]
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
      `
            WITH data AS (
                SELECT 
                    t.id AS task_id,
                    c.id AS contract_id,
                    c.doc_num,
                    c.doc_date,
                    o.name AS organization_name,
                    o.address AS organization_address,
                    o.str AS organization_str,
                    o.bank_name AS organization_bank_name,
                    o.mfo AS organization_mfo,
                    o.account_number AS organization_account_number,
                    t.task_time,
                    t.worker_number,
                    t.result_summa::FLOAT,
                    t.result_summa,
                    t.discount_money,
                    t.summa
                FROM task AS t
                JOIN contract AS c ON c.id = t.contract_id
                JOIN organization AS o ON o.id = c.organization_id
                WHERE c.account_number_id = $1  
                    AND c.doc_date BETWEEN $2 AND $3 
                    AND t.batalon_id = $4
                    AND  0 = (SELECT (c.result_summa - COALESCE(SUM(summa), 0))::FLOAT FROM prixod WHERE isdeleted = false AND contract_id = c.id)
                    AND  NOT EXISTS (SELECT * FROM rasxod WHERE isdeleted = false AND task_id = t.id)
                    AND c.isdeleted = false
            )
            SELECT 
                ARRAY_AGG(ROW_TO_JSON(data)) AS data,
                (
                    SELECT COALESCE(SUM(t.result_summa), 0)::FLOAT 
                    FROM task AS t
                    JOIN contract AS c ON c.id = t.contract_id
                    WHERE c.account_number_id = $1  
                        AND c.doc_date BETWEEN $2 AND $3 
                        AND t.batalon_id = $4 
                        AND 0 = (SELECT (c.result_summa - COALESCE(SUM(summa), 0))::FLOAT FROM prixod WHERE isdeleted = FALSE AND contract_id = c.id) 
                        AND  NOT EXISTS (SELECT * FROM rasxod WHERE isdeleted = false AND task_id = t.id)
                        AND c.isdeleted = false
                ) AS itogo
            FROM data 

        `,
      [account_number, from, to, batalon_id]
    );
    return { data: result.rows[0]?.data || [], itogo: result.rows[0].itogo };
  } catch (error) {
    throw new ErrorResponse(error, error.statusCode);
  }
};

const createRasxodDocService = async (data) => {
  const client = await pool.connect();
  try {
    await client.query(`BEGIN`);
    const rasxod_doc = await client.query(
      `
            INSERT INTO rasxod_doc(
                doc_num, 
                doc_date, 
                batalon_id, 
                user_id, 
                opisanie, 
                account_number_id,
                batalon_gazna_number_id,
                batalon_account_number_id
            ) VALUES($1, $2, $3, $4, $5, $6, $7, $8) 
            RETURNING * 
        `,
      [
        data.doc_num,
        data.doc_date,
        data.batalon_id,
        data.user_id,
        data.opisanie,
        data.account_number_id,
        data.batalon_gazna_number_id,
        data.batalon_account_number_id,
      ]
    );

    const rasxod = rasxod_doc.rows[0];

    const queryArray = [];
    for (let task of data.tasks) {
      queryArray.push(
        client.query(
          `INSERT INTO rasxod(task_id, rasxod_doc_id) VALUES($1, $2) RETURNING * 
            `,
          [task.task_id, rasxod.id]
        )
      );
    }
    const rasxods = await Promise.all(queryArray);
    rasxod.tasks = rasxods.map((item) => item.rows[0]);
    await client.query(`COMMIT`);
    return rasxod;
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
    const params = [account_number_id, from, to, user_id];
    let batalon_filter = ``;
    let offset_limit = ``;
    if (batalon_id) {
      batalon_filter = ` AND d.batalon_id = $${params.length + 1}`;
      params.push(batalon_id);
    }
    if (offset !== null && limit !== null) {
      offset_limit = `OFFSET $${params.length + 1} LIMIT $${params.length + 2}`;
      params.push(offset, limit);
    }
    const result = await pool.query(
      `--sql
            WITH data AS (
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
                    (
                        SELECT COALESCE(SUM(t.result_summa), 0) AS summa
                        FROM rasxod AS r
                        JOIN task AS t ON t.id = r.task_id
                        WHERE r.rasxod_doc_id = d.id
                          AND r.isdeleted = false
                          AND t.isdeleted = false
                    ) AS summa
                FROM rasxod_doc AS d
                JOIN batalon AS b ON b.id = d.batalon_id 
                LEFT JOIN gazna_numbers g ON g.id = d.batalon_gazna_number_id
                LEFT JOIN account_number a ON a.id = d.batalon_account_number_id 
                WHERE d.account_number_id = $1
                    AND d.doc_date BETWEEN $2 AND $3
                    AND d.user_id = $4 ${batalon_filter} AND d.isdeleted = false 
                ${offset_limit}
            )
            SELECT 
                ARRAY_AGG(ROW_TO_JSON(data)) AS data,
                (
                    SELECT COALESCE(COUNT(id), 0)::INTEGER  
                    FROM rasxod_doc AS d 
                    WHERE d.account_number_id = $1 
                    AND d.doc_date BETWEEN $2 AND $3 
                    AND d.user_id = $4 ${batalon_filter} AND d.isdeleted = false
                ) AS total_count,
                (
                    SELECT COALESCE(SUM(t.result_summa), 0)::FLOAT AS summa
                    FROM rasxod AS r
                    JOIN task AS t ON t.id = r.task_id
                    JOIN rasxod_doc AS d ON d.id = r.rasxod_doc_id
                    WHERE r.isdeleted = false  AND t.isdeleted = false AND d.doc_date < $2  AND d.isdeleted = false ${batalon_filter} AND d.isdeleted = false
                ) AS summa_from,
                (
                    SELECT COALESCE(SUM(t.result_summa), 0)::FLOAT AS summa
                    FROM rasxod AS r
                    JOIN task AS t ON t.id = r.task_id
                    JOIN rasxod_doc AS d ON d.id = r.rasxod_doc_id
                    WHERE r.isdeleted = false  AND t.isdeleted = false AND d.doc_date < $3  AND d.isdeleted = false ${batalon_filter} AND d.isdeleted = false
                ) AS summa_to,
                 (
                    SELECT COALESCE(SUM(t.result_summa), 0)::FLOAT AS summa
                    FROM rasxod AS r
                    JOIN task AS t ON t.id = r.task_id
                    JOIN rasxod_doc AS d ON d.id = r.rasxod_doc_id
                    WHERE r.isdeleted = false AND d.doc_date BETWEEN $2 AND $3 AND t.isdeleted = false AND d.isdeleted = false ${batalon_filter} AND d.isdeleted = false
                ) AS summa
            FROM data
        `,
      params
    );
    const data = result.rows[0];
    return {
      data: data?.data || [],
      total: data.total_count,
      summa_from: Math.round(data.summa_from * 100) / 100,
      summa_to: Math.round(data.summa_to * 100) / 100,
      summa: Math.round(data.summa * 100) / 100,
    };
  } catch (error) {
    throw new ErrorResponse(error, error.statusCode);
  }
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
                b.account_number AS batalon_account_number,
                (
                    SELECT COALESCE(SUM(t.result_summa), 0)::FLOAT AS summa
                    FROM rasxod AS r
                    JOIN task AS t ON t.id = r.task_id
                    WHERE r.rasxod_doc_id = d.id AND r.isdeleted = false
                ) AS summa,
                (
                    SELECT 
                        ARRAY_AGG(ROW_TO_JSON(task))
                    FROM (
                        SELECT 
                            t.id AS task_id,
                            c.doc_num,
                            c.doc_date,
                            o.name AS organization_name,
                            o.address AS organization_address,
                            o.str AS organization_str,
                            o.bank_name AS organization_bank_name,
                            o.mfo AS organization_mfo,
                            o.account_number AS organization_account_number,
                            t.task_time,
                            t.worker_number,
                            t.result_summa::FLOAT,
                            t.result_summa,
                            t.discount_money,
                            t.summa    
                        FROM rasxod AS r 
                        JOIN task AS t ON r.task_id = t.id
                        JOIN contract AS c ON c.id = t.contract_id
                        JOIN organization AS o ON o.id = c.organization_id
                        WHERE r.rasxod_doc_id = $3
                    ) AS task
                ) AS tasks 
            FROM rasxod_doc AS d
            JOIN batalon AS b ON b.id = d.batalon_id
            WHERE d.account_number_id = $1 AND d.user_id = $2 AND d.id = $3  ${ignore_filter}
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
      `UPDATE rasxod SET isdeleted = true WHERE rasxod_doc_id = $1 AND isdeleted = false`,
      [id]
    );
    await client.query(
      `UPDATE rasxod_doc SET isdeleted = true WHERE id = $1 AND isdeleted = false`,
      [id]
    );
    await client.query(`COMMIT`);
    return;
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
    const rasxod_doc = await client.query(
      `UPDATE rasxod_doc SET 
            doc_num = $1, 
            doc_date = $2, 
            batalon_id = $3, 
            opisanie = $4,
            batalon_account_number_id = $5,
            batalon_gazna_number_id = $6
            WHERE id = $7
            RETURNING * 
        `,
      [
        data.doc_num,
        data.doc_date,
        data.batalon_id,
        data.opisanie,
        data.batalon_account_number_id,
        data.batalon_gazna_number_id,
        data.id,
      ]
    );
    const rasxod = rasxod_doc.rows[0];
    await client.query(`DELETE FROM rasxod WHERE rasxod_doc_id = $1`, [
      data.id,
    ]);
    const queryArray = [];
    for (let task of data.tasks) {
      queryArray.push(
        client.query(
          `INSERT INTO rasxod(task_id, rasxod_doc_id) VALUES($1, $2) RETURNING * 
            `,
          [task.task_id, rasxod.id]
        )
      );
    }
    const rasxods = await Promise.all(queryArray);
    rasxod.tasks = rasxods.map((item) => item.rows[0]);
    await client.query(`COMMIT`);
    return rasxod;
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
  getByIdTaskService,
  getRasxodService,
  getByIdRasxodService,
  deeleteRasxodService,
  updateRasxodService,
};
