const { db } = require("@db/index");
const { textCyrlToLatin, textLatinToCyrl } = require("@helper/functions");

exports.WorkerDB = class {
  static async create(params) {
    await db.query(
      `
            INSERT INTO worker(fio, batalon_id, account_number, xisob_raqam, user_id) 
            VALUES($1, $2, $3, $4, $5)
        `,
      params
    );
  }

  static async update(params, search = null) {
    await db.query(
      `
            UPDATE worker 
            SET fio = $1, account_number = $2, xisob_raqam = $3
            WHERE id = $4 AND isdeleted = false
        `,
      params
    );
  }

  static async get(params, search = null, batalon_id = null) {
    let filter = ``;

    if (search) {
      let translate;
      if (/^[a-zA-Z\s]+$/.test(search)) {
        translate = textLatinToCyrl(search);
      } else {
        translate = textCyrlToLatin(search);
      }

      filter = `AND (
                w.fio ILIKE  '%' || $${params.length + 1} || '%' 
                OR w.fio ILIKE '%' || $${params.length + 2} || '%'
            )`;
      params.push(search, translate);
    }

    const query = `
            WITH data AS (
                SELECT 
                    w.id, w.fio, w.account_number, w.user_id,
                    b.name AS batalon_name, w.xisob_raqam,
                    row_to_json(b) AS batalon
                FROM worker w 
                LEFT JOIN batalon  b ON b.id = w.batalon_id
                JOIN users u ON w.user_id = u.id
                WHERE w.isdeleted = false
                  b.id = $1
                  ${filter} 
                ORDER BY w.fio
                OFFSET $2 LIMIT $3
            )
            SELECT 
                ARRAY_AGG(row_to_json(data)) AS data,
                (
                    SELECT COALESCE(COUNT(w.id), 0)
                    FROM worker w 
                    LEFT JOIN batalon AS b ON b.id = w.batalon_id
                    JOIN users AS u ON w.user_id = u.id
                    WHERE w.isdeleted = false 
                      AND b.id = $1
                    ${filter} 
                    ${batalon_filter}
                )::INTEGER  total_count
            FROM data
        `;

    const result = await db.query(query, params);

    return { data: result[0]?.data || [], total: result[0].total_count };
  }

  static async getById(params, isdeleted = null, batalon_id = null) {
    let batalon_filter = ``;

    if (batalon_id) {
      params.push(batalon_id);
      batalon_filter = `AND b.id = $${params.length}`;
    }

    const query = `
            SELECT 
                w.id, 
                w.fio, 
                w.account_number, 
                w.user_id, 
                b.name AS batalon_name, 
                w.xisob_raqam,
                row_to_json(b) AS batalon
            FROM worker w 
            LEFT JOIN batalon AS b ON b.id = w.batalon_id
            JOIN users AS u ON w.user_id = u.id
            WHERE  b.id = $1
                AND w.id = $2 
                ${batalon_filter}
                ${!isdeleted ? "AND w.isdeleted = false" : ""}
        `;

    const result = await db.query(query, params);

    return result[0];
  }

  static async delete(params) {
    const query = `UPDATE worker SET isdeleted = true WHERE id = $1`;
    await db.query(query, params);
  }

  static async getByAccountNumber(params) {
    const result = await db.query(
      `
            SELECT * 
            FROM worker 
            WHERE account_number = $1 
                AND isdeleted = false 
                AND user_id = $2
            `,
      params
    );
    return result[0];
  }

  static async getByXisobNumber(params) {
    const result = await db.query(
      `
            SELECT * 
            FROM worker 
            WHERE xisob_raqam = $1 
                AND isdeleted = false 
                AND user_id = $2
            `,
      params
    );
    return result[0];
  }

  static async getByFio(params) {
    const result = await db.query(
      `
            SELECT * 
            FROM worker 
            WHERE fio = $1 
                AND isdeleted = false 
                AND user_id = $2
            `,
      params
    );
    return result[0];
  }
};
