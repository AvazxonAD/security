const { db } = require("@db/index");

exports.UsersDB = class {
  static async create(params) {
    const query = `--sql
            INSERT INTO users
            (
                fio, 
                login, 
                password, 
                image, 
                batalon_id,
                user_id,
                created_at,
                updated_at
            ) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id
        `;

    const result = await db.query(query, params);

    return result[0];
  }

  static async getByBatalonId(params, birgada = null) {
    let birgada_filter = ``;

    if (birgada) {
      birgada_filter = `AND u.birgada = ${birgada}`;
    }
    const query = `--sql
            SELECT 
                u.*
            FROM users AS u 
            WHERE u.isdeleted = false
                AND u.batalon_id = $1
                AND u.user_id = $2
                ${birgada_filter}
        `;

    const result = await db.query(query, params);

    return result[0];
  }

  static async update(params) {
    const query = `--sql
      UPDATE users SET 
        fio = $1, 
        login = $2,
        password = $3, 
        image = $4, 
        batalon_id = $5,
        updated_at = $6
      WHERE id = $7
      RETURNING id
    `;

    const result = await db.query(query, params);

    return result;
  }

  static async getById(params) {
    const query = `--sql
        SELECT
            u.*,
            row_to_json(b) AS batalon
        FROM users AS u 
        JOIN batalon AS b ON b.id = u.batalon_id 
        WHERE u.isdeleted = false
            AND u.id = $1
            AND u.user_id = $2
    `;

    const result = await db.query(query, params);

    return result[0];
  }

  static async delete(params) {
    const query = `UPDATE users SET isdeleted = true WHERE id = $1 RETURNING id`;

    await db.query(query, params);
  }

  static async get(params) {
    const query = `--sql
        WITH data AS (
          SELECT
            u.*,
            row_to_json(b) AS batalon
          FROM users AS u 
          JOIN batalon AS b ON b.id = u.batalon_id 
          WHERE u.isdeleted = false
              AND u.user_id = $1
          OFFSET $2 LIMIT $3
        )
        SELECT
          COALESCE(JSON_AGG(row_to_json(data)), '[]'::JSON) AS data,
          (
            SELECT
              COALESCE(COUNT(u.id))
            FROM users AS u 
            JOIN batalon AS b ON b.id = u.batalon_id 
            WHERE u.isdeleted = false
                AND u.user_id = $1
          )::INTEGER AS total

        FROM data
    `;

    const result = await db.query(query, params);

    return result[0];
  }
};
