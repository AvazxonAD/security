const pool = require("../../config/db");
const ErrorResponse = require("../../utils/errorResponse");

const prixodRasxodService = async (from, to, offset, limit, user_id) => {
  try {
    let user_filter = ``;
    const params = [from, to, offset, limit];
    if (user_id) {
      user_filter = `AND u.id = $${params.length + 1}`;
      params.push(user_id);
    }
    const { rows } = await pool.query(
      `--sql
            SELECT 
                u.id AS user_id,
                d.doer AS doer_name,
                a.adress AS doer_address,
                s.str AS doer_inn,
                a_n.account_number AS doer_account_number,
                boss.boss AS doer_boss,
                b.bank AS doer_bank_name,
                b.mfo AS doer_bank_mfo,
                t.id AS tashkilot_id,
                t.name AS tashkilot_name,
                t.address AS tashkilot_address,
                t.str AS tashkilot_inn,
                t.account_number AS tashkilot_account_number,
                p.id,
                p.doc_num,
                TO_CHAR(p.doc_date, 'YYYY-MM-DD') AS doc_date,
                p.opisanie,
                0::FLOAT AS rasxod_sum,
                p.summa::FLOAT AS prixod_sum,
                'prixod' AS type  
            FROM prixod AS p 
            JOIN users AS u ON u.id = p.user_id
            LEFT JOIN doer AS d ON d.user_id = u.id
            LEFT JOIN adress AS a ON a.user_id = u.id
            LEFT JOIN str AS s ON s.user_id = u.id
            LEFT JOIN account_number AS a_n ON a_n.id = p.account_number_id 
            LEFT JOIN boss ON boss.user_id = u.id
            LEFT JOIN bank AS b ON b.user_id = u.id
            JOIN contract AS c ON c.id = p.contract_id
            JOIN organization AS t ON t.id = c.organization_id
            WHERE p.isdeleted = false AND p.doc_date BETWEEN $1 AND $2 AND c.isdeleted = false ${user_filter}

            UNION ALL 

            SELECT 
                u.id AS user_id,
                d.doer AS doer_name,
                a.adress AS doer_address,
                s.str AS doer_inn,
                a_n.account_number AS doer_account_number,
                boss.boss AS doer_boss,
                b.bank AS doer_bank_name,
                b.mfo AS doer_bank_mfo,
                t.id AS tashkilot_id,
                t.name AS tashkilot_name,
                t.address AS tashkilot_address,
                t.str AS tashkilot_inn,
                t.account_number AS tashkilot_account_number,
                r_d.id,
                r_d.doc_num,
                TO_CHAR(r_d.doc_date, 'YYYY-MM-DD') AS doc_date,
                r_d.opisanie,
                (
                  SELECT 
                    COALESCE(SUM(t_k.summa), 0)
                  FROM rasxod AS r 
                  JOIN task AS t_k ON t_k.id = r.task_id
                  WHERE r_d.id = r.rasxod_doc_id AND t_k.isdeleted = false
                    AND r.isdeleted = false
                ) AS rasxod_sum,
                0::FLOAT AS prixod_sum,
                'rasxod' AS type
            FROM rasxod_doc AS r_d
            JOIN users AS u ON u.id = r_d.user_id
            LEFT JOIN doer AS d ON d.user_id = u.id
            LEFT JOIN adress AS a ON a.user_id = u.id
            LEFT JOIN str AS s ON s.user_id = u.id
            LEFT JOIN account_number AS a_n ON a_n.id = r_d.account_number_id 
            LEFT JOIN boss ON boss.user_id = u.id
            LEFT JOIN bank AS b ON b.user_id = u.id
            JOIN batalon AS t ON t.id = r_d.batalon_id
            WHERE r_d.isdeleted = false
              AND r_d.doc_date BETWEEN $1 AND $2
              ${user_filter}

            UNION ALL 

            SELECT 
                u.id AS user_id,
                d.doer AS doer_name,
                a.adress AS doer_address,
                s.str AS doer_inn,
                a_n.account_number AS doer_account_number,
                boss.boss AS doer_boss,
                b.bank AS doer_bank_name,
                b.mfo AS doer_bank_mfo,
                t.id AS tashkilot_id,
                t.name AS tashkilot_name,
                t.address AS tashkilot_address,
                t.str AS tashkilot_inn,
                t.account_number AS tashkilot_account_number,
                r_d.id,
                r_d.doc_num,
                TO_CHAR(r_d.doc_date, 'YYYY-MM-DD') AS doc_date,
                r_d.opisanie,
                (
                  SELECT 
                    COALESCE(SUM(w_t.summa), 0)
                  FROM rasxod_fio AS r 
                  JOIN worker_task AS w_t ON w_t.id = r.worker_task_id
                  WHERE r_d.id = r.rasxod_fio_doc_id AND w_t.isdeleted = false
                    AND r.isdeleted = false
                ) AS rasxod_sum,
                0::FLOAT AS prixod_sum,
                'rasxod fio' AS type
            FROM rasxod_fio_doc AS r_d
            JOIN users AS u ON u.id = r_d.user_id
            LEFT JOIN doer AS d ON d.user_id = u.id
            LEFT JOIN adress AS a ON a.user_id = u.id
            LEFT JOIN str AS s ON s.user_id = u.id
            LEFT JOIN account_number AS a_n ON a_n.id = r_d.account_number_id 
            LEFT JOIN boss ON boss.user_id = u.id
            LEFT JOIN bank AS b ON b.user_id = u.id
            JOIN batalon AS t ON t.id = r_d.batalon_id 
            WHERE r_d.isdeleted = false
              AND r_d.doc_date BETWEEN $1 AND $2
              ${user_filter}

            ORDER BY doc_date
            OFFSET $3 LIMIT $4
        `,
      params
    );

    const total_params = [from, to];
    let user_filter_total = "";

    if (user_id) {
      user_filter_total = `AND u.id = $${total_params.length + 1}`;
      total_params.push(user_id);
    }

    const total = await pool.query(
      `--sql
            SELECT 
                (SELECT COALESCE(COUNT(p.id), 0)::INTEGER 
                FROM prixod AS p 
                JOIN users AS u ON u.id = p.user_id
                JOIN contract AS c ON c.id = p.contract_id
                JOIN organization AS t ON t.id = c.organization_id
                WHERE p.isdeleted = false AND  p.doc_date BETWEEN $1 AND $2 AND c.isdeleted = false ${user_filter_total}) + 
                (SELECT COALESCE(COUNT( DISTINCT r_d.id), 0)::INTEGER
                FROM rasxod_doc AS r_d
                JOIN users AS u ON u.id = r_d.user_id
                JOIN rasxod AS r ON r_d.id = r.rasxod_doc_id
                JOIN task AS t_k ON t_k.id = r.task_id
                JOIN batalon AS t ON t.id = t_k.batalon_id
                WHERE r_d.isdeleted = false AND r_d.doc_date BETWEEN $1 AND $2 ${user_filter_total}) + 
                (SELECT COALESCE(COUNT(DISTINCT r_d.id), 0)::INTEGER  
                FROM rasxod_fio_doc AS r_d
                JOIN users AS u ON u.id = r_d.user_id
                JOIN rasxod_fio AS r ON r_d.id = r.rasxod_fio_doc_id
                JOIN worker_task AS w_t ON w_t.id = r.worker_task_id
                JOIN task AS t_k ON t_k.id = w_t.task_id
                JOIN batalon AS t ON t.id = t_k.batalon_id
                WHERE r_d.isdeleted = false AND  r_d.doc_date BETWEEN $1 AND $2 ${user_filter_total}) AS total_count
        `,
      total_params
    );
    const summa_from_params = [from];
    const summa_to_params = [to];
    let user_date_filter = ``;
    if (user_id) {
      user_date_filter = `AND u.id = $2`;
      summa_from_params.push(user_id);
      summa_to_params.push(user_id);
    }
    const prixod_from = await pool.query(
      `--sql
            SELECT COALESCE(SUM(p.summa), 0)::FLOAT AS summa 
            FROM prixod AS p 
            JOIN users AS u ON u.id = p.user_id
            WHERE p.doc_date < $1
              AND p.isdeleted = false
              ${user_date_filter}
        `,
      summa_from_params
    );
    const prixod_summa_from =
      prixod_from.rows.length > 0 ? prixod_from.rows[0].summa : 0;
    const rasxod_from = await pool.query(
      `--sql
            SELECT 
                COALESCE(SUM(t_k.result_summa), 0)::FLOAT AS summa
            FROM rasxod_doc AS r_d
            JOIN users AS u ON u.id = r_d.user_id
            JOIN rasxod AS r ON r_d.id = r.rasxod_doc_id
            LEFT JOIN task AS t_k ON t_k.id = r.task_id
            LEFT JOIN batalon AS t ON t.id = t_k.batalon_id
            WHERE r_d.isdeleted = false
              AND r_d.doc_date < $1  ${user_date_filter}
        `,
      summa_from_params
    );
    const rasxod_summa_from =
      rasxod_from.rows.length > 0 ? rasxod_from.rows[0].summa : 0;
    const rasxod_fio_from = await pool.query(
      `--sql
            SELECT 
              COALESCE(SUM(w_t.summa), 0)::FLOAT AS summa 
            FROM rasxod_fio_doc AS r_d
            JOIN users AS u ON u.id = r_d.user_id
            JOIN rasxod_fio AS r ON r_d.id = r.rasxod_fio_doc_id
            JOIN worker_task AS w_t ON w_t.id = r.worker_task_id
            WHERE r_d.isdeleted = false AND r_d.doc_date < $1 ${user_date_filter}
        `,
      summa_from_params
    );
    const rasxod_fio_summa_from =
      rasxod_fio_from.rows.length > 0 ? rasxod_fio_from.rows[0].summa : 0;
    const summa_from =
      prixod_summa_from - (rasxod_fio_summa_from + rasxod_summa_from);
    const prixod_to = await pool.query(
      `--sql
            SELECT COALESCE(SUM(p.summa), 0)::FLOAT AS summa 
            FROM prixod AS p 
            JOIN users AS u ON u.id = p.user_id
            WHERE p.doc_date < $1 AND  p.isdeleted = false ${user_date_filter}
        `,
      summa_to_params
    );
    const prixod_summa_to =
      prixod_to.rows.length > 0 ? prixod_to.rows[0].summa : 0;
    const rasxod_to = await pool.query(
      `--sql
            SELECT 
            COALESCE(SUM(t_k.result_summa), 0)::FLOAT AS summa
            FROM rasxod AS r
            JOIN rasxod_doc AS r_d ON r_d.id = r.rasxod_doc_id
            JOIN users AS u ON u.id = r_d.user_id
            JOIN task AS t_k ON t_k.id = r.task_id
            WHERE r_d.isdeleted = false AND r_d.doc_date < $1  ${user_date_filter}
        `,
      summa_to_params
    );
    const rasxod_summa_to =
      rasxod_to.rows.length > 0 ? rasxod_to.rows[0].summa : 0;
    const rasxod_fio_to = await pool.query(
      `--sql
            SELECT 
            COALESCE(SUM(w_t.summa), 0)::FLOAT AS summa
            FROM rasxod_fio_doc AS r_d
            JOIN users AS u ON u.id = r_d.user_id
            JOIN rasxod_fio AS r ON r_d.id = r.rasxod_fio_doc_id
            JOIN worker_task AS w_t ON w_t.id = r.worker_task_id
            WHERE r_d.isdeleted = false AND r_d.doc_date < $1  ${user_date_filter}
        `,
      summa_to_params
    );
    const rasxod_fio_summa_to =
      rasxod_fio_to.rows.length > 0 ? rasxod_fio_to.rows[0].summa : 0;
    const summa_to = prixod_summa_to - (rasxod_fio_summa_to + rasxod_summa_to);
    let prixod = 0;
    let rasxod = 0;
    rows.forEach((item) => {
      (prixod += item.prixod_sum), (rasxod += item.rasxod_sum);
    });
    return {
      rows,
      total: total.rows[0].total_count,
      summa_from: Math.round(summa_from * 100) / 100,
      summa_to: Math.round(summa_to * 100) / 100,
      prixod: Math.round(prixod * 100) / 100,
      rasxod: Math.round(rasxod * 100) / 100,
    };
  } catch (error) {
    throw new ErrorResponse(error, error.statusCode);
  }
};

const monitoringService = async (year, month, user_id) => {
  try {
    let params = [];
    let params_2 = [year, month];
    let user_filter = ``;
    let user_filter_2 = ``;
    if (user_id) {
      user_filter = `AND u.region_id = $${params.length + 1}`;
      user_filter_2 = `AND u.region_id = $${params_2.length + 1}`;
      params.push(user_id);
      params_2.push(user_id);
    }
    const byUser = await pool.query(
      `--sql
            SELECT 
                u.id,
                u.region_id,
                r.name AS region_name
            FROM users AS u
            JOIN regions AS r ON r.id = u.region_id
            WHERE u.isdeleted = false AND u.region_id IS NOT NULL ${user_filter}
        `,
      params
    );
    let itogo = 0;
    const colors = [
      "#FF5733",
      "#33FF57",
      "#3357FF",
      "#FF33A6",
      "#FFD133",
      "#33FFF3",
      "#C70039",
      "#900C3F",
      "#581845",
      "#DAF7A6",
      "#FFC300",
      "#1ABC9C",
      "#8E44AD",
      "#FF5733",
    ];

    for (let i = 1; i <= byUser.rows.length; i++) {
      const result = await pool.query(
        `--sql
                SELECT 
                    COALESCE(SUM(c.result_summa), 0)::FLOAT AS sum,
                    COALESCE(COUNT(c.id), 0)::INTEGER AS count,
                    COALESCE(SUM(c.id), 0)::FLOAT AS task_time
                FROM contract AS c
                WHERE c.isdeleted = false 
                AND c.user_id = $1
                AND 0 = ( SELECT (c.result_summa - COALESCE(SUM(summa), 0))::FLOAT FROM prixod WHERE isdeleted = false AND contract_id = c.id)
                AND EXTRACT(YEAR FROM c.doc_date) = $2
                AND EXTRACT(MONTH FROM c.doc_date) = $3
            `,
        [byUser.rows[i - 1].id, year, month]
      );
      byUser.rows[i - 1].summa = result.rows[0].sum;
      byUser.rows[i - 1].count = result.rows[0].count;
      byUser.rows[i - 1].task_time = result.rows[0].task_time;
      byUser.rows[i - 1].color = colors[i - 1] || colors[0];
      itogo += byUser.rows[i - 1].summa;
    }
    const user_result = byUser.rows.map((item) => {
      if (item.summa === 0) {
        item.percent = 0;
      } else {
        item.percent = Math.round(((item.summa * 100) / itogo) * 100) / 100;
      }
      return item;
    });
    let month_sum = {};
    let itogo_year = 0;
    for (let i = 1; i <= 12; i++) {
      const result = await pool.query(
        `--sql
                SELECT 
                    COALESCE(SUM(c.result_summa), 0)::FLOAT AS sum
                FROM contract AS c
                JOIN users AS u ON u.id = c.user_id 
                WHERE c.isdeleted = false ${user_filter} 
                AND 0 = (SELECT (c.result_summa - COALESCE(SUM(summa), 0))::FLOAT 
                    FROM prixod 
                    WHERE isdeleted = false AND contract_id = c.id)
                AND EXTRACT(YEAR FROM c.doc_date) = $1
                AND EXTRACT(MONTH FROM c.doc_date) = $2
            `,
        [year, i]
      );
      month_sum[`oy_${i}`] = result.rows[0].sum;
      itogo_year += result.rows[0].sum;
    }
    for (let i = 1; i <= 12; i++) {
      month_sum[`oy_${i}_percent`] =
        itogo_year > 0
          ? Math.round(((month_sum[`oy_${i}`] * 100) / itogo_year) * 100) / 100
          : 0;
    }
    const workers = await pool.query(
      `--sql
            SELECT 
                w.id,
                w.fio,
                u.region_id,
                r.name AS region_name,
                b.name AS batalon_name,
                (
                    SELECT COALESCE(SUM(w_t.summa), 0)::FLOAT
                    FROM worker_task AS w_t
                    JOIN task AS t ON t.id = w_t.task_id
                    JOIN contract AS c ON c.id = t.contract_id
                    WHERE w_t.worker_id = w.id  AND w_t.isdeleted = false
                    AND 0 = COALESCE((SELECT (c.result_summa - COALESCE(SUM(summa), 0))::FLOAT 
                        FROM prixod 
                        WHERE isdeleted = false AND contract_id = c.id),0
                    )
                    AND EXTRACT(YEAR FROM c.doc_date) = $1
                    AND EXTRACT(MONTH FROM c.doc_date) = $2
                ) AS summa,
                (
                    SELECT COALESCE(SUM(w_t.task_time), 0)::FLOAT
                    FROM worker_task AS w_t
                    JOIN task AS t ON t.id = w_t.task_id
                    JOIN contract AS c ON c.id = t.contract_id
                    WHERE w_t.worker_id = w.id  AND w_t.isdeleted = false
                    AND 0 = COALESCE((SELECT (c.result_summa - COALESCE(SUM(summa), 0))::FLOAT 
                        FROM prixod 
                        WHERE isdeleted = false AND contract_id = c.id),0
                    )
                    AND EXTRACT(YEAR FROM c.doc_date) = $1
                    AND EXTRACT(MONTH FROM c.doc_date) = $2
                ) AS task_time 
            FROM worker AS w 
            JOIN batalon AS b ON b.id = w.batalon_id
            JOIN users AS u ON u.id = b.user_id
            JOIN regions AS r ON r.id = u.region_id
            WHERE w.isdeleted = false ${user_filter_2}  AND 0 < (
                SELECT COALESCE(SUM(w_t.task_time), 0)::FLOAT
                FROM worker_task AS w_t
                JOIN task AS t ON t.id = w_t.task_id
                JOIN contract AS c ON c.id = t.contract_id
                WHERE w_t.worker_id = w.id  AND w_t.isdeleted = false
                AND 0 = COALESCE((SELECT (c.result_summa - COALESCE(SUM(summa), 0))::FLOAT 
                    FROM prixod 
                    WHERE isdeleted = false AND contract_id = c.id),0
                )
                AND EXTRACT(YEAR FROM c.doc_date) = $1
                AND EXTRACT(MONTH FROM c.doc_date) = $2
            ) 
            ORDER BY summa DESC
            LIMIT 10
        `,
      params_2
    );

    for (let worker of workers.rows) {
      worker.task_time = Math.round(worker.task_time * 100) / 100;
    }

    const batalons = await pool.query(
      `--sql
            SELECT 
                u.region_id,
                r.name AS region_name,
                b.id AS batalon_id,
                b.name AS batalon_name,
                (
                    SELECT COALESCE(SUM(t.result_summa), 0)::FLOAT
                    FROM task AS t
                    JOIN contract AS c ON c.id = t.contract_id
                    WHERE t.batalon_id = b.id  AND t.isdeleted = false 
                    AND 0 = COALESCE((SELECT (c.result_summa - COALESCE(SUM(summa), 0))::FLOAT 
                        FROM prixod 
                        WHERE isdeleted = false AND contract_id = c.id),0
                    )
                    AND EXTRACT(YEAR FROM c.doc_date) = $1
                    AND EXTRACT(MONTH FROM c.doc_date) = $2
                ) AS summa,
                (
                    SELECT COALESCE(SUM(t.task_time), 0)::FLOAT
                    FROM task AS t
                    JOIN contract AS c ON c.id = t.contract_id
                    WHERE t.batalon_id = b.id  AND t.isdeleted = false 
                    AND 0 = COALESCE((SELECT (c.result_summa - COALESCE(SUM(summa), 0))::FLOAT 
                        FROM prixod 
                        WHERE isdeleted = false AND contract_id = c.id),0
                    )
                    AND EXTRACT(YEAR FROM c.doc_date) = $1
                    AND EXTRACT(MONTH FROM c.doc_date) = $2
                ) AS task_time
            FROM batalon AS b
            JOIN users AS u ON u.id = b.user_id
            JOIN regions AS r ON r.id = u.region_id
            WHERE b.isdeleted = false ${user_filter_2} AND 0 < (
                SELECT COALESCE(SUM(t.task_time), 0)::FLOAT
                FROM task AS t
                JOIN contract AS c ON c.id = t.contract_id
                WHERE t.batalon_id = b.id  AND t.isdeleted = false 
                AND 0 = COALESCE((SELECT (c.result_summa - COALESCE(SUM(summa), 0))::FLOAT 
                    FROM prixod 
                    WHERE isdeleted = false AND contract_id = c.id),0
                )
                AND EXTRACT(YEAR FROM c.doc_date) = $1
                AND EXTRACT(MONTH FROM c.doc_date) = $2
            )   
            ORDER BY summa DESC
            LIMIT 10
        `,
      params_2
    );

    for (let batalon of batalons.rows) {
      batalon.task_time = Math.round(batalon.task_time * 100) / 100;
    }

    user_result.sort((a, b) => b.percent - a.percent);
    return {
      itogo,
      byUser: user_result,
      month: { month_sum, itogo_year },
      workers: workers.rows,
      batalons: batalons.rows,
    };
  } catch (error) {
    throw new ErrorResponse(error, error.statusCode);
  }
};

module.exports = {
  prixodRasxodService,
  monitoringService,
};
