const { db } = require("../../db/index");

exports.BatalonDB = class {
  static async getById(params, isdeleted = null) {
    const result = await db.query(
      `
            SELECT id, name, address, str, bank_name, mfo, account_number,treasury1, treasury2, birgada
            FROM batalon 
            WHERE user_id = $1 
                AND id = $2
                ${!isdeleted ? "AND isdeleted = false" : ""} 
        `,
      params
    );

    return result[0];
  }

  static async getByBatalonId(params) {
    const result = await db.query(
      `
            SELECT
              *
            FROM batalon 
            WHERE id = $1
        `,
      params
    );

    return result[0];
  }

  static async getByName(params, isdeleted = null) {
    const result = await db.query(
      `
            SELECT id, name, address, str, bank_name, mfo, account_number,treasury1, treasury2, birgada
            FROM batalon 
            WHERE user_id = $1 AND name = $2
        `,
      params
    );

    return result[0];
  }
};

const pool = require("../../config/db");
const ErrorResponse = require("../../utils/errorResponse");

exports.batalonCreateService = async (data) => {
  try {
    const result = await db.transaction(async (client) => {
      const batalon = await pool.query(
        `
                INSERT INTO batalon
                (
                    name, 
                    birgada, 
                    user_id, 
                    address, 
                    str, 
                    bank_name, 
                    mfo,
                    account_number
                ) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [
          data.name,
          data.birgada,
          data.user_id,
          data.address,
          data.str,
          data.bank_name,
          data.mfo,
          data.account_number,
        ]
      );

      return batalon.rows[0];
    });

    return result;
  } catch (error) {
    throw new ErrorResponse(error, error.statusCode);
  }
};

exports.batalonUpdateService = async (data) => {
  try {
    const result = await db.transaction(async (client) => {
      const batalon = await pool.query(
        `UPDATE batalon SET 
                name = $1, 
                birgada = $2,
                address = $3, 
                str = $4, 
                bank_name = $5, 
                mfo = $6,
                account_number = $7
                WHERE id = $8
                  AND isdeleted = false 
                RETURNING *
            `,
        [
          data.name,
          data.birgada,
          data.address,
          data.str,
          data.bank_name,
          data.mfo,
          data.account_number,
          data.id,
        ]
      );

      return batalon.rows[0];
    });

    return result;
  } catch (error) {
    throw new ErrorResponse(error, error.statusCode);
  }
};

exports.getBatalonService = async (user_id, birgada = null, search) => {
  try {
    let search_filter = ``;
    let birgada_filter = ``;

    const params = [user_id];
    if (search) {
      search_filter = `AND (
                    b.str ILIKE  '%' || $${params.length + 1} || '%' 
                    OR b.name ILIKE  '%' || $${params.length + 1} || '%'
                    OR b.address ILIKE  '%' || $${params.length + 1} || '%'
                )
            `;
      params.push(search);
    }

    if (birgada) {
      params.push(birgada);
      birgada_filter = `AND b.birgada = $${params.length}`;
    }

    const { rows } = await pool.query(
      `--sql
            SELECT 
              b.*
            FROM batalon b
            WHERE b.isdeleted = false 
                AND b.user_id = $1 
                ${search_filter}
                ${birgada_filter}
            ORDER BY b.id DESC, b.name
        `,
      params
    );

    return { data: rows };
  } catch (error) {
    throw new ErrorResponse(error, error.statusCode);
  }
};

exports.getByIdBatalonService = async (
  user_id,
  id,
  birgada = false,
  batalon = false,
  lang
) => {
  try {
    const result = await pool.query(
      `--sql
            SELECT 
              b.*
            FROM batalon b
            WHERE b.user_id = $1 
                AND b.id = $2 
        `,
      [user_id, id]
    );
    if (!result.rows[0]) {
      throw new ErrorResponse(lang.t("batalonNotFound"), 404);
    }
    return result.rows[0];
  } catch (error) {
    throw new ErrorResponse(error, error.statusCode);
  }
};

exports.getByNameBatalonService = async (user_id, name, check = true, lang) => {
  try {
    const result = await pool.query(
      `SELECT id, name, address, str, bank_name, mfo, account_number,treasury1, treasury2, birgada
            FROM batalon WHERE isdeleted = false AND user_id = $1 AND name = $2
        `,
      [user_id, name]
    );
    if (check) {
      if (result.rows[0]) {
        throw new ErrorResponse(lang.t("batalonExists"), 409);
      }
    } else {
      if (!result.rows[0]) {
        throw new ErrorResponse(lang.t("batalonNotFound"), 404);
      }
    }
    return result.rows[0];
  } catch (error) {
    throw new ErrorResponse(error, error.statusCode);
  }
};

exports.deleteBatalonService = async (id) => {
  try {
    const result = await pool.query(
      `UPDATE batalon SET isdeleted = true WHERE id = $1 AND isdeleted = false RETURNING *`,
      [id]
    );
    return result.rows[0];
  } catch (error) {
    throw new ErrorResponse(error, error.statusCode);
  }
};

exports.getOnlyBatalon = async (user_id) => {
  try {
    await pool.query(
      `SELECT id, name FROM batalon WHERE isdeleted = false AND user_id = $1 AND birgada = false`,
      [user_id]
    );
  } catch (error) {
    throw new ErrorResponse(error, error.statusCode);
  }
};
