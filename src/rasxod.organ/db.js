const { db } = require('../db/index');

exports.RasxodOrganDB = class {
    static async create(params) {
        const query = `
            INSERT INTO rasxod_organ (
                user_id,
                organization_id,
                opisanie,
                doc_num,
                doc_date,
                summa,
                account_number_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
        `;

        const result = await db.query(query, params);
        return result[0];
    }

    static async get(params, search) {
        let search_filter = ``;
        if (search) {
            params.push(search);
            if (!isNaN(search) && !IsNaN(parseFloat(search))) {
                search_filter = `AND p.doc_num = $${params.length}`;
            } else {
                search_filter = `AND o.name ILIKE '%' || $${params.length} || '%'`; 
            }
        }

        const query = `
            WITH data AS (
                SELECT 
                    r.id, 
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
                    o.account_number AS organization_account_number,
                    o.treasury1 AS organization_treasury1,
                    o.treasury2 AS organization_treasury2,
                    r.summa::FLOAT AS rasxod_summa, 
                    r.doc_num AS rasxod_doc_num,
                    r.opisanie,
                    TO_CHAR(r.doc_date, 'YYYY-MM-DD') AS rasxod_date
                FROM rasxod_organ r
                JOIN contract AS c ON c.id = r.contract_id 
                JOIN organization AS o ON c.organization_id = o.id 
                WHERE r.isdeleted = false AND r.user_id = $1 AND r.doc_date BETWEEN $2 AND $3 AND r.account_number_id = $4 
                ORDER BY r.id DESC
                OFFSET $5 LIMIT $6
            )
            SELECT 
                ARRAY_AGG(row_to_json(data)) AS data,
                (
                    SELECT 
                        COALESCE(COUNT(id)::INTEGER, 0)
                    FROM rasxod_organ 
                    WHERE isdeleted = false 
                        AND user_id = $1 
                        AND doc_date BETWEEN $2 AND $3 
                        AND account_number_id = $4
                ) AS total_count,
                (
                    SELECT 
                        COALESCE(SUM(summa)::FLOAT, 0)
                    FROM rasxod_organ 
                    WHERE isdeleted = false 
                        AND user_id = $1 
                        AND doc_date BETWEEN $2 AND $3 
                        AND account_number_id = $4
                ) AS summa,
                (
                    SELECT 
                        COALESCE(SUM(summa)::FLOAT, 0)
                    FROM rasxod_organ 
                    WHERE isdeleted = false 
                        AND user_id = $1 
                        AND doc_date <= $2 
                        AND account_number_id = $4
                ) AS from_balance,
                (
                    SELECT 
                        COALESCE(SUM(summa)::FLOAT, 0)
                    FROM rasxod_organ 
                    WHERE isdeleted = false 
                        AND user_id = $1 
                        AND doc_date <= $3 
                        AND account_number_id = $4
                ) AS to_balance 
            FROM data
        `;

        const result = await db.query(query, params);

        return result;
    }

    static async getById(params, isdeleted) {
        const query = `
            SELECT 
                r.id, 
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
                o.account_number AS organization_account_number,
                o.treasury1 AS organization_treasury1,
                o.treasury2 AS organization_treasury2,
                r.summa::FLOAT AS rasxod_summa, 
                r.opisanie,
                r.doc_num AS rasxod_doc_num,
                TO_CHAR(r.doc_date, 'YYYY-MM-DD') AS rasxod_date
            FROM rasxod_organ r 
            JOIN contract AS c ON c.id = r.contract_id 
            JOIN organization AS o ON c.organization_id = o.id 
            WHERE r.isdeleted = false 
                AND r.user_id = $1 
                AND r.id = $2 
                AND r.account_number_id = $3 
                ${!isdeleted ? 'AND r.isdeleted = false' : ''}
        `;

        const result = await db.query(query, params);

        return result[0];
    }

    static async update(params) {
        const query = `
            UPDATE rasxod_organ SET 
                organization_id = $1,
                opisanie = $2,
                doc_num = $3,
                doc_date = $4,
                summa = $5
            WHERE id = $6 RETURNING id
        `;

        const result = await db.query(query, params);

        return result[0];
    }

    static async delete(params) {
        const query = `
            UPDATE rasxod_organ SET isdeleted = true WHERE id = $1 AND isdeleted = false RETURNING id
        `;

        const result = await db.query(query, params);

        return result[0];
    }
}