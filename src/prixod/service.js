const { PrixodDB } = require("./db");

exports.PrixodService = class {
  static async checkDocs(data) {
    const result = await PrixodDB.checkDocs([data.contract_id]);

    return result;
  }
};

const ErrorResponse = require("../utils/errorResponse");
const pool = require("../config/db");

exports.prixodCreateService = async (data) => {
  try {
    const prixod = await pool.query(
      `
            INSERT INTO prixod (
            user_id,
            organization_id,
            contract_id,
            opisanie,
            doc_num,
            doc_date,
            summa,
            account_number_id,
            organ_account_number_id, 
            organ_gazna_number_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *  
            `,
      [
        data.user_id,
        data.organization_id,
        data.contract_id,
        data.opisanie,
        data.doc_num,
        data.doc_date,
        data.summa,
        data.account_number_id,
        data.organ_account_number_id,
        data.organ_gazna_number_id,
      ]
    );

    return prixod.rows[0];
  } catch (error) {
    throw new ErrorResponse(error, error.statusCode);
  }
};

exports.getPrixodService = async (
  user_id,
  from,
  to,
  offset,
  limit,
  account_number_id,
  search,
  organization_id
) => {
  try {
    const params = [user_id, from, to, account_number_id];
    let offset_limit = ``;
    if (offset !== null && limit !== null) {
      offset_limit = `OFFSET $${params.length + 1} LIMIT $${params.length + 2}`;
      params.push(offset, limit);
    }

    const conditions = [];

    if (search) {
      conditions.push(`
                    AND (
                      d.doc_num = $${params.length + 1} 
                      OR o.name ILIKE  '%' || $${params.length + 1} || '%'
                      OR c.doc_num = $${params.length + 1}
                    )
                    `);
      params.push(search);
    }

    const where_clouse = conditions.length ? `${conditions.join(" AND ")}` : "";

    const query = `
      WITH data AS (
                SELECT 
                    d.*, 
                    c.id AS contract_id,
                    c.doc_num AS contract_doc_num,
                    TO_CHAR(c.doc_date, 'YYYY-MM-DD') AS contract_doc_date, 
                    c.result_summa::FLOAT AS contract_summa, 
                    o.id AS organization_id,
                    o.name AS organization_name,
                    o.address AS organization_address,
                    o.str AS organization_str,
                    o.bank_name AS organization_bank_name,
                    o.mfo AS organization_mfo,
                    g.gazna_number,
                    a.account_number,
                    d.summa::FLOAT AS prixod_summa, 
                    d.doc_num AS prixod_doc_num,
                    d.opisanie,
                    TO_CHAR(d.doc_date, 'YYYY-MM-DD') AS prixod_date
                FROM prixod AS d
                LEFT JOIN gazna_numbers g ON g.id = d.organ_gazna_number_id
                LEFT JOIN account_number a ON a.id = d.organ_account_number_id 
                JOIN contract AS c ON c.id = d.contract_id 
                JOIN organization AS o ON c.organization_id = o.id 
                WHERE d.isdeleted = false
                  AND d.user_id = $1
                  AND d.doc_date BETWEEN $2 AND $3
                  AND d.account_number_id = $4
                  ${where_clouse}
                ORDER BY d.id DESC
                ${offset_limit}
            )
            SELECT 
                ARRAY_AGG(row_to_json(data)) AS data,
                (
                  SELECT 
                    COALESCE(COUNT(d.id)::INTEGER, 0)
                  FROM prixod d
                  JOIN contract AS c ON c.id = d.contract_id 
                  JOIN organization AS o ON c.organization_id = o.id
                  WHERE d.isdeleted = false 
                    AND d.user_id = $1 
                    AND d.doc_date BETWEEN $2 AND $3 
                    ${where_clouse}
                ) AS total_count,
                (
                  SELECT 
                    COALESCE(SUM(d.summa)::FLOAT, 0)
                  FROM prixod d
                  JOIN contract AS c ON c.id = d.contract_id 
                  JOIN organization AS o ON c.organization_id = o.id
                  WHERE d.isdeleted = false 
                    AND d.user_id = $1 
                    AND d.doc_date BETWEEN $2 AND $3 
                    AND d.account_number_id = $4
                    ${where_clouse}
                ) AS summa,
                (
                  SELECT 
                    COALESCE(SUM(d.summa)::FLOAT, 0)
                  FROM prixod d
                  JOIN contract AS c ON c.id = d.contract_id 
                  JOIN organization AS o ON c.organization_id = o.id
                  WHERE d.isdeleted = false 
                    AND d.user_id = $1 
                    AND d.doc_date <= $2 
                    AND d.account_number_id = $4
                    ${where_clouse}
                ) AS from_balance,
                (
                  SELECT 
                    COALESCE(SUM(d.summa)::FLOAT, 0)
                  FROM prixod d 
                  JOIN contract AS c ON c.id = d.contract_id 
                  JOIN organization AS o ON c.organization_id = o.id
                  WHERE d.isdeleted = false 
                    AND d.user_id = $1 
                    AND d.doc_date <= $3 
                    AND d.account_number_id = $4
                    ${where_clouse}
                ) AS to_balance 
            FROM data
    `;
    const prixods = await pool.query(query, params);

    const result = prixods.rows[0];

    return {
      data: result?.data || [],
      total: result.total_count,
      from_balance: result.from_balance,
      to_balance: result.to_balance,
      summa: result.summa,
    };
  } catch (error) {
    throw new ErrorResponse(error, error.statusCode);
  }
};

exports.getByIdPrixodService = async (
  user_id,
  id,
  account_number_id,
  isdeleted = false,
  lang
) => {
  try {
    let filter = ``;
    if (!isdeleted) {
      filter = `AND d.isdeleted = false`;
    }
    const data = await pool.query(
      `
            SELECT 
                d.id, 
                c.id AS contract_id,
                c.doc_num AS contract_doc_num,
                TO_CHAR(c.doc_date, 'YYYY-MM-DD') AS contract_doc_date, 
                c.result_summa::FLOAT AS contract_summa, 
                o.id AS organization_id,
                o.name AS organization_name,
                o.address AS organization_address,
                o.str AS organization_str,
                o.bank_name AS organization_bank_name,
                o.mfo AS organization_mfo,
                g.gazna_number,
                a.account_number,
                d.organ_gazna_number_id,
                d.organ_account_number_id,
                d.summa::FLOAT AS prixod_summa, 
                d.opisanie,
                d.doc_num AS prixod_doc_num,
                TO_CHAR(d.doc_date, 'YYYY-MM-DD') AS prixod_date,
                ( 
                    SELECT 
                        (c.result_summa - COALESCE(SUM(summa), 0))::FLOAT 
                    FROM prixod 
                    WHERE isdeleted = false 
                        AND contract_id = c.id
                ) AS remaining_balance
            FROM prixod AS d 
            LEFT JOIN gazna_numbers g ON g.id = d.organ_gazna_number_id
            LEFT JOIN account_number a ON a.id = d.organ_account_number_id 
            LEFT JOIN contract AS c ON c.id = d.contract_id 
            LEFT JOIN organization AS o ON c.organization_id = o.id 
            WHERE d.isdeleted = false AND d.user_id = $1 AND d.account_number_id = $3 AND d.id = $2 ${filter}
        `,
      [user_id, id, account_number_id]
    );
    if (!data.rows[0]) {
      throw new ErrorResponse(lang.t("docNotFound"), 404);
    }
    return data.rows[0];
  } catch (error) {
    throw new ErrorResponse(error, error.statusCode);
  }
};

exports.updatePrixodService = async (data) => {
  try {
    const result = await pool.query(
      `
            UPDATE prixod SET 
                organization_id = $1,
                contract_id = $2,
                opisanie = $3,
                doc_num = $4,
                doc_date = $5,
                summa = $6
            WHERE id = $7 RETURNING * 
        `,
      [
        data.organization_id,
        data.contract_id,
        data.opisanie,
        data.doc_num,
        data.doc_date,
        data.summa,
        data.id,
      ]
    );
    return result.rows[0];
  } catch (error) {
    throw new ErrorResponse(error, error.statusCode);
  }
};

exports.deletePrixodService = async (id) => {
  try {
    await pool.query(
      `UPDATE prixod SET isdeleted = true WHERE id = $1 AND isdeleted = false`,
      [id]
    );
  } catch (error) {
    throw new ErrorResponse(error, error.statusCode);
  }
};
