const { db } = require(`@db/index`);

exports.BatalonTaskDB = class {
  static async get(params, filter) {
    const conditions = [];

    if (filter.search) {
      params.push(filter.search);
      const index = params.length;
      conditions.push(
        `c.doc_num = $${index} OR t.address ILIKE '%' || $${index} || '%'`
      );
    }

    if (filter.status) {
      if (filter.status === "done") {
        conditions.push(` 
          0 = (
            SELECT
              (t.task_time * t.worker_number) - COALESCE(SUM(wt.task_time), 0)
            FROM worker_task wt 
            WHERE wt.isdeleted = false
              AND wt.task_id = t.id
          )
        `);
      } else if (filter.status === "extended") {
        conditions.push(` 
          0 != (
            SELECT
              (t.task_time * t.worker_number) - COALESCE(SUM(wt.task_time), 0)
            FROM worker_task wt 
            WHERE wt.isdeleted = false
              AND wt.task_id = t.id
          ) 
          AND t.deadline < $6
        `);
      } else {
        conditions.push(` 
          0 != (
            SELECT
              (t.task_time * t.worker_number) - COALESCE(SUM(wt.task_time), 0)
            FROM worker_task wt 
            WHERE wt.isdeleted = false
              AND wt.task_id = t.id
          ) 
          AND t.deadline > $6
        `);
      }
    }

    const where = conditions.length ? `AND ${conditions.join(" AND ")}` : "";

    const query = `--sql
       WITH data AS (
        SELECT 
          t.*,
          TO_CHAR(t.deadline, 'DD.MM.YYYY') AS deadline,
          c.doc_num,
          (
            SELECT
              (t.task_time * t.worker_number) - COALESCE(SUM(wt.task_time), 0)
            FROM worker_task wt 
            WHERE wt.isdeleted = false
              AND wt.task_id = t.id
          ) AS remaining_task_time,
          CASE
            WHEN 0 = (
              SELECT
              (t.task_time * t.worker_number) - COALESCE(SUM(wt.task_time), 0)
              FROM worker_task wt 
              WHERE wt.isdeleted = false
                AND wt.task_id = t.id
              )
            THEN 'Bajarilgan'
            WHEN 0 != (
              SELECT
                ((t.task_time * t.worker_number)) - COALESCE(SUM(wt.task_time), 0)
              FROM worker_task wt 
              WHERE wt.isdeleted = false
                AND wt.task_id = t.id
              )
              AND t.deadline < $6
            THEN 'Muddati o''tgan'
            ELSE 'Bajarilmoqda'
          END AS status,
          JSON_BUILD_OBJECT(
            'doc_num', c.doc_num,
            'start_date', TO_CHAR(c.start_date, 'DD.MM.YYYY'),
            'start_time', c.start_time,  
            'end_date', TO_CHAR(c.end_date, 'DD.MM.YYYY'),
            'end_time', c.end_time,
            'organization', o.name
          ) AS contract_info,
          COALESCE((t.task_time * t.worker_number), 0) AS real_task_time
        FROM task t
        JOIN contract c ON c.id = t.contract_id
        JOIN organization o ON o.id = c.organization_id
        WHERE t.isdeleted = false
          AND t.batalon_id = $1
          AND c.isdeleted = false
          AND t.deadline BETWEEN $2 AND $3
          ${where}
        ORDER BY t.deadline DESC
        OFFSET $4 LIMIT $5
      )
      
      SELECT 
          ARRAY_AGG(row_to_json(data)) AS data,
          (
            SELECT
              COALESCE(COUNT(t.id), 0)
            FROM task t
            JOIN contract c ON c.id = t.contract_id
            WHERE t.isdeleted = false
              AND t.batalon_id = $1
              AND c.isdeleted = false
              AND t.deadline BETWEEN $2 AND $3
              ${where}
          )::INTEGER AS total

      FROM data
    `;

    const result = await db.query(query, params);

    return result[0];
  }

  static async getById(params) {
    const query = `--sql
      SELECT 
        t.*, 
        b.name AS batalon_name,
        b.birgada,
        t.summa::FLOAT, 
        t.result_summa::FLOAT,
        t.discount_money::FLOAT,
        c.doc_num AS contract_number,
        TO_CHAR(t.task_date, 'YYYY-MM-DD') AS task_date,
        (   
            (t.task_time * t.worker_number) - (
                SELECT COALESCE(SUM(task_time), 0)
                FROM worker_task 
                WHERE task_id = t.id AND isdeleted = false
                ) 
        ) AS remaining_task_time,
        COALESCE((t.task_time * t.worker_number), 0) AS real_task_time,
        JSON_BUILD_OBJECT(
          'doc_num', c.doc_num,
          'start_date', TO_CHAR(c.start_date, 'DD.MM.YYYY'),
          'start_time', c.start_time,  
          'end_date', TO_CHAR(c.end_date, 'DD.MM.YYYY'),
          'end_time', c.end_time,
          'organization', o.name
        ) AS contract_info,
      FROM task AS t
      JOIN contract c ON c.id = t.contract_id 
      JOIN batalon AS b ON b.id = t.batalon_id 
      JOIN organization o ON o.id = c.organization_id
      WHERE t.id = $1
        AND t.isdeleted = false
    `;

    const result = await db.query(query, params);

    return result[0];
  }
};
