const { db } = require("@db/index");

exports.MonitoringDB = class {
  static async getDocs(params) {
    const query = `--sql
            WITH data AS (
                SELECT 
                    t.id AS tashkilot_id,
                    t.name AS tashkilot_name,
                    t.address AS tashkilot_address,
                    t.str AS tashkilot_inn,
                    g.gazna_number,
                    a.account_number,
                    d.id,
                    d.doc_num,
                    TO_CHAR(d.doc_date, 'YYYY-MM-DD') AS doc_date,
                    d.opisanie,
                    0::FLOAT AS rasxod_sum,
                    d.summa::FLOAT AS prixod_sum,
                    'prixod' AS type 
                FROM prixod AS d 
                JOIN contract AS c ON c.id = d.contract_id
                JOIN organization AS t ON t.id = c.organization_id
                LEFT JOIN gazna_numbers g ON g.id = d.organ_gazna_number_id
                LEFT JOIN organ_account_numbers a ON a.id = d.organ_account_number_id
                WHERE d.user_id = $1 
                    AND d.isdeleted = false 
                    AND d.account_number_id = $2 
                    AND d.doc_date BETWEEN $3 AND $4 

                UNION ALL 

                SELECT 
                    t.id AS tashkilot_id,
                    t.name AS tashkilot_name,
                    t.address AS tashkilot_address,
                    t.str AS tashkilot_inn,
                    g.gazna_number,
                    a.account_number,
                    d.id,
                    d.doc_num,
                    TO_CHAR(d.doc_date, 'YYYY-MM-DD') AS doc_date,
                    d.opisanie,
                    (
                        SELECT 
                            COALESCE(SUM(t_k.result_summa), 0)
                        FROM rasxod AS r 
                        JOIN task AS t_k ON t_k.id = r.task_id
                        WHERE d.id = r.rasxod_doc_id AND t_k.isdeleted = false
                            AND r.isdeleted = false
                    ) AS rasxod_sum,
                    0::FLOAT AS prixod_sum,
                    'rasxod' AS type
                FROM rasxod_doc AS d
                JOIN batalon AS t ON t.id = d.batalon_id
                LEFT JOIN gazna_numbers g ON g.id = d.batalon_gazna_number_id
                LEFT JOIN organ_account_numbers a ON a.id = d.batalon_account_number_id
                WHERE d.user_id = $1 
                    AND d.isdeleted = false 
                    AND d.account_number_id = $2 
                    AND d.doc_date BETWEEN $3 AND $4

                UNION ALL 

                SELECT 
                    t.id AS tashkilot_id,
                    t.name AS tashkilot_name,
                    t.address AS tashkilot_address,
                    t.str AS tashkilot_inn,
                    g.gazna_number,
                    a.account_number,
                    d.id,
                    d.doc_num,
                    TO_CHAR(d.doc_date, 'YYYY-MM-DD') AS doc_date,
                    d.opisanie,
                    COALESCE(SUM(w_t.summa), 0)::FLOAt AS rasxod_sum,
                    0::FLOAT AS prixod_sum,
                    'rasxod fio' AS type    
                FROM rasxod_fio_doc AS d
                JOIN rasxod_fio AS r ON d.id = r.rasxod_fio_doc_id
                JOIN worker_task AS w_t ON w_t.id = r.worker_task_id
                JOIN task AS t_k ON t_k.id = w_t.task_id
                JOIN batalon AS t ON t.id = t_k.batalon_id
                LEFT JOIN gazna_numbers g ON g.id = d.batalon_gazna_number_id
                LEFT JOIN organ_account_numbers a ON a.id = d.batalon_account_number_id
                WHERE d.user_id = $1 
                    AND d.isdeleted = false 
                    AND d.account_number_id = $2 
                    AND d.doc_date BETWEEN $3 AND $4 
                GROUP BY t.id, t.name, t.address, t.str, d.id, d.doc_num, d.doc_date, d.opisanie, g.gazna_number, a.account_number
                
                UNION ALL 

                SELECT 
                    t.id AS tashkilot_id,
                    t.name AS tashkilot_name,
                    t.address AS tashkilot_address,
                    t.str AS tashkilot_inn,
                    g.gazna_number,
                    a.account_number,
                    d.id,
                    d.doc_num,
                    TO_CHAR(d.doc_date, 'YYYY-MM-DD') AS doc_date,
                    d.opisanie,
                    0::FLOAT AS prixod_sum,
                    d.summa::FLOAT AS rasxod_sum,
                    'rasxod_organ' AS type  
                FROM rasxod_organ AS d 
                JOIN organization AS t ON t.id = d.organization_id
                LEFT JOIN gazna_numbers g ON g.id = d.gazna_number_id
                LEFT JOIN organ_account_numbers a ON a.id = d.organ_account_number_id
                WHERE d.user_id = $1 
                    AND d.isdeleted = false 
                    AND d.account_number_id = $2 
                    AND d.doc_date BETWEEN $3 AND $4 
                
                ORDER BY doc_date
                OFFSET $5 LIMIT $6
            )

            SELECT 
                JSON_AGG(row_to_json(data)) AS data,
                (
                    SELECT 
                        SUM(count) AS total_count
                    FROM (
                        SELECT 
                            COALESCE(COUNT(d.id), 0)::INTEGER AS count
                        FROM prixod AS d 
                        WHERE d.user_id = $1 
                            AND d.isdeleted = false 
                            AND d.account_number_id = $2 
                            AND d.doc_date BETWEEN $3 AND $4 

                        UNION ALL 

                        SELECT 
                            COALESCE(COUNT(d.id), 0)::INTEGER AS count
                        FROM rasxod_doc AS d
                        WHERE d.user_id = $1 
                            AND d.isdeleted = false 
                            AND d.account_number_id = $2 
                            AND d.doc_date BETWEEN $3 AND $4

                        UNION ALL 

                        SELECT 
                            COALESCE(COUNT(d.id), 0)::INTEGER AS count
                        FROM rasxod_fio_doc AS d
                        WHERE d.user_id = $1 
                            AND d.isdeleted = false 
                            AND d.account_number_id = $2 
                            AND d.doc_date BETWEEN $3 AND $4 
                        
                        UNION ALL 

                        SELECT 
                            COALESCE(COUNT(d.id), 0)::INTEGER AS count
                        FROM rasxod_organ AS d
                        WHERE d.user_id = $1 
                            AND d.isdeleted = false 
                            AND d.account_number_id = $2 
                            AND d.doc_date BETWEEN $3 AND $4
                    ) AS subquery
                )::FLOAT AS total

            FROM data 
        `;

    const data = await db.query(query, params);

    return data[0];
  }

  static async getSumma(params, start, end) {
    let date_filter = ``;

    if (start && end) {
      params.push(start, end);
      date_filter = `AND d.doc_date BETWEEN $${params.length - 1} AND $${
        params.length
      }`;
    } else if (start && !end) {
      params.push(start);
      date_filter = `AND d.doc_date <= $${params.length}`;
    } else if (!start && end) {
      params.push(end);
      date_filter = `AND d.doc_date <= $${params.length}`;
    }

    const query = `
            WITH prixod AS (
                SELECT 
                    COALESCE(SUM(d.summa), 0)::FLOAT AS summa
                FROM prixod AS d 
                JOIN contract AS c ON c.id = d.contract_id
                JOIN organization AS t ON t.id = c.organization_id
                WHERE d.user_id = $1 
                    AND d.isdeleted = false 
                    AND d.account_number_id = $2 
                    ${date_filter}
            ),

            rasxod AS (
                SELECT                 
                    COALESCE(SUM(t_k.result_summa), 0)::FLOAT AS summa
                FROM rasxod_doc AS d
                JOIN rasxod AS r ON d.id = r.rasxod_doc_id
                JOIN task AS t_k ON t_k.id = r.task_id
                JOIN batalon AS t ON t.id = t_k.batalon_id
                WHERE d.user_id = $1 
                    AND d.isdeleted = false 
                    AND d.account_number_id = $2 
                    ${date_filter}
            ),

            rasxod_fio AS (
                SELECT 
                    COALESCE(SUM(w_t.summa), 0)::FLOAT AS summa
                FROM rasxod_fio_doc AS d
                JOIN rasxod_fio AS r ON d.id = r.rasxod_fio_doc_id
                JOIN worker_task AS w_t ON w_t.id = r.worker_task_id
                JOIN task AS t_k ON t_k.id = w_t.task_id
                JOIN batalon AS t ON t.id = t_k.batalon_id
                LEFT JOIN gazna_numbers g ON g.id = d.batalon_gazna_number_id
                LEFT JOIN organ_account_numbers a ON a.id = d.batalon_account_number_id
                WHERE d.user_id = $1 
                    AND d.isdeleted = false 
                    AND d.account_number_id = $2 
                    ${date_filter}
            ),

            rasxod_organ AS (
                SELECT 
                    COALESCE(SUM(d.summa), 0)::FLOAT AS summa
                FROM rasxod_organ AS d 
                JOIN organization AS t ON t.id = d.organization_id
                WHERE d.user_id = $1 
                    AND d.isdeleted = false 
                    AND d.account_number_id = $2 
                    ${date_filter}
            )

            SELECT 
                (prixod.summa - (rasxod.summa + rasxod_fio.summa + rasxod_organ.summa)) AS summa, 
                prixod.summa AS prixod, 
                (rasxod.summa + rasxod_fio.summa + rasxod_organ.summa) AS rasxod
            FROM prixod, rasxod, rasxod_fio, rasxod_organ;
        `;

    const data = await db.query(query, params);

    return data[0];
  }
};
