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
                account_number_id,
                organ_account_number_id,
                gazna_number_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
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
                    d.id, 
                    o.id AS organization_id,
                    o.name AS organization_name,
                    o.address AS organization_address,
                    o.str AS organization_str,
                    o.bank_name AS organization_bank_name,
                    o.mfo AS organization_mfo,
                    d.gazna_number_id::INTEGER,
                    d.organ_account_number_id::INTEGER,
                    g.gazna_number,
                    a.account_number,
                    d.summa::FLOAT, 
                    d.doc_num AS rasxod_doc_num,
                    d.opisanie,
                    TO_CHAR(d.doc_date, 'YYYY-MM-DD') AS rasxod_date
                FROM rasxod_organ d
                JOIN organization AS o ON d.organization_id = o.id 
                LEFT JOIN gazna_numbers g ON g.id = d.gazna_number_id
                LEFT JOIN account_number a ON a.id = d.organ_account_number_id
                WHERE d.isdeleted = false 
                    AND d.user_id = $1 
                    AND d.doc_date BETWEEN $2 AND $3 
                    AND d.account_number_id = $4 
                    ${search_filter}
                ORDER BY d.id DESC
                OFFSET $5 LIMIT $6
            )
            SELECT 
                ARRAY_AGG(row_to_json(data)) AS data,
                (
                    SELECT 
                        COALESCE(COUNT(d.id)::INTEGER, 0)
                    FROM rasxod_organ d
                    JOIN organization AS o ON d.organization_id = o.id 
                    WHERE d.isdeleted = false 
                        AND d.user_id = $1 
                        AND d.doc_date BETWEEN $2 AND $3 
                        AND d.account_number_id = $4
                        ${search_filter}
                ) AS total_count,
                (
                    SELECT 
                        COALESCE(SUM(summa)::FLOAT, 0)
                    FROM rasxod_organ d 
                    JOIN organization AS o ON d.organization_id = o.id 
                    WHERE d.isdeleted = false 
                        AND d.user_id = $1 
                        AND d.doc_date BETWEEN $2 AND $3 
                        AND d.account_number_id = $4
                        ${search_filter}
                ) AS summa,
                (
                    SELECT 
                        COALESCE(SUM(summa)::FLOAT, 0)
                    FROM rasxod_organ d 
                    JOIN organization AS o ON d.organization_id = o.id 
                    WHERE d.isdeleted = false 
                        AND d.user_id = $1 
                        AND d.doc_date <= $2 
                        AND d.account_number_id = $4
                        ${search_filter}
                ) AS from_balance,
                (
                    SELECT 
                        COALESCE(SUM(summa)::FLOAT, 0)
                    FROM rasxod_organ d 
                    JOIN organization AS o ON d.organization_id = o.id 
                    WHERE d.isdeleted = false 
                        AND d.user_id = $1 
                        AND d.doc_date <= $3 
                        AND d.account_number_id = $4
                        ${search_filter}
                ) AS to_balance 
            FROM data
        `;

        const result = await db.query(query, params);

        return result[0];
    }

    static async getById(params, isdeleted) {
        const query = `
            SELECT 
                d.id, 
                o.id AS organization_id,
                o.name AS organization_name,
                o.address AS organization_address,
                o.str AS organization_str,
                o.bank_name AS organization_bank_name,
                o.mfo AS organization_mfo,
                d.gazna_number_id::INTEGER,
                d.organ_account_number_id::INTEGER,
                g.gazna_number,
                a.account_number,
                d.summa::FLOAT, 
                d.opisanie,
                d.doc_num AS rasxod_doc_num,
                TO_CHAR(d.doc_date, 'YYYY-MM-DD') AS rasxod_date
            FROM rasxod_organ d 
            JOIN organization AS o ON d.organization_id = o.id
            LEFT JOIN gazna_numbers g ON g.id = d.gazna_number_id
            LEFT JOIN account_number a ON a.id = d.organ_account_number_id 
            WHERE d.isdeleted = false 
                AND d.user_id = $1 
                AND d.id = $2 
                AND d.account_number_id = $3 
                ${!isdeleted ? 'AND d.isdeleted = false' : ''}
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
                summa = $5,
                organ_account_number_id = $6,
                gazna_number_id = $7
            WHERE id = $8 
            RETURNING id
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