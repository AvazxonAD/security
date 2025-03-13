const pool = require('../config/db')
const ErrorResponse = require('../utils/errorResponse')
const { db } = require('@db/index');

const organizationCreateService = async (data) => {
    try {
        const result = await db.transaction(async client => {
            const organ = await client.query(`
                INSERT INTO 
                    organization(
                        name,
                        address,
                        str,
                        bank_name, 
                        mfo,
                        user_id
                    ) 
                VALUES($1, $2, $3, $4, $5, $6) RETURNING *
            `, [
                data.name,
                data.address,
                data.str,
                data.bank_name,
                data.mfo,
                data.user_id
            ]);

            for (let account of data.account_numbers) {
                const query = `
                    INSERT INTO 
                        account_number(
                            account_number, 
                            organ_id
                        ) 
                    VALUES($1, $2) RETURNING *
                `;
                await client.query(query, [account.account_number, organ.rows[0].id])
            }

            for (let gazna of data.gazna_numbers) {
                const query = `
                    INSERT INTO 
                        gazna_numbers(
                            gazna_number, 
                            organ_id
                        ) 
                    VALUES($1, $2) RETURNING *
                `;
                await client.query(query, [gazna.gazna_number, organ.rows[0].id])
            }

            return organ.rows[0];
        })

        return result;
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const organizationUpdateService = async (data) => {
    try {
        const result = await db.transaction(async (client) => {
            const organ = await client.query(`
                UPDATE organization 
                SET 
                    name = $1, 
                    address = $2,
                    str = $3, 
                    bank_name = $4, 
                    mfo = $5 
                WHERE id = $6
                    AND isdeleted = false 
                RETURNING *
            `, [
                data.name,
                data.address,
                data.str,
                data.bank_name,
                data.mfo,
                data.id
            ]);

            if (!organ.rows.length) {
                throw new Error("Organization not found");
            }

            const create_gazna = [];
            const create_account_number = [];

            // gazna
            for (let gazna of data.old_data.gazna_numbers) {
                const check = data.gazna_numbers.find(item => item.id === gazna.id);
                if (!check) {
                    await client.query(`UPDATE gazna_numbers SET isdeleted = true WHERE id = $1`, [gazna.id]);
                }
            }

            for (let gazna of data.gazna_numbers) {
                if (!gazna.id) {
                    create_gazna.push(gazna);
                } else {
                    await client.query(`
                        UPDATE gazna_numbers 
                        SET gazna_number = $1, updated_at = $2  
                        WHERE id = $3
                    `, [
                        gazna.gazna_number,
                        new Date(),
                        gazna.id
                    ]);
                }
            }

            for (let gazna of create_gazna) {
                await client.query(`
                    INSERT INTO gazna_numbers(gazna_number, organ_id) 
                    VALUES($1, $2) RETURNING *
                `, [gazna.gazna_number, organ.rows[0].id]);
            }

            // account_number
            for (let account_number of data.old_data.account_numbers) {
                const check = data.account_numbers.find(item => item.id === account_number.id);
                if (!check) {
                    await client.query(`UPDATE account_number SET isdeleted = true WHERE id = $1`, [account_number.id]);
                }
            }

            for (let account_number of data.account_numbers) {
                if (!account_number.id) {
                    create_account_number.push(account_number);
                } else {
                    await client.query(`
                        UPDATE account_number 
                        SET account_number = $1, updated_at = $2  
                        WHERE id = $3
                    `, [
                        account_number.account_number,
                        new Date(),
                        account_number.id
                    ]);
                }
            }

            for (let account_number of create_account_number) {
                await client.query(`
                    INSERT INTO account_number(account_number, organ_id) 
                    VALUES($1, $2) RETURNING *
                `, [account_number.account_number, organ.rows[0].id]);
            }

            return organ.rows[0];
        });

        return result;
    } catch (error) {
        throw new ErrorResponse(error.message || "Xatolik yuz berdi", error.statusCode || 500);
    }
};

const getorganizationService = async (user_id, search, offset, limit) => {
    try {
        let filter = ``;
        const params = [user_id, offset, limit];
        if (search) {
            filter = `AND (
                    o.str ILIKE  '%' || $${params.length + 1} || '%' 
                    OR o.name ILIKE  '%' || $${params.length + 1} || '%'
                    OR o.address ILIKE  '%' || $${params.length + 1} || '%'
                )
            `
            params.push(search)
        }
        const { rows } = await pool.query(`
            WITH data AS (
                SELECT 
                    o.id, 
                    o.name, 
                    o.address, 
                    o.str, 
                    o.bank_name, 
                    o.mfo,
                    COALESCE((
                        SELECT 
                            JSON_AGG(
                                JSON_BUILD_OBJECT(
                                    'id',    g.id,
                                    'gazna_number', g.gazna_number
                                )
                            )
                        FROM gazna_numbers g
                        WHERE g.isdeleted = false
                            AND g.organ_id = o.id
                    ), '[]'::JSON) AS gazna_numbers,
                    COALESCE((
                        SELECT 
                            JSON_AGG(
                                JSON_BUILD_OBJECT(
                                    'id',    a.id,
                                    'account_number', a.account_number
                                )
                            )
                        FROM  account_number a  
                        WHERE a.isdeleted = false
                            AND a.organ_id = o.id
                    ), '[]'::JSON) AS account_numbers
                FROM organization o
                WHERE o.isdeleted = false 
                    AND o.user_id = $1 ${filter}
                ORDER BY o.id DESC, o.name 
                OFFSET $2 LIMIT $3
            )
            SELECT 
                ARRAY_AGG(row_to_json(data)) AS data,
                COALESCE((SELECT COUNT(o.id) FROM organization o WHERE o.isdeleted = false AND o.user_id = $1 ${filter}), 0)::INTEGER AS total_count
            FROM data
        `, params);
        return { data: rows[0]?.data || [], total: rows[0].total_count }
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode);
    }
}


const excelDataOrganizationService = async (user_id) => {
    try {
        const { rows } = await pool.query(`
            WITH data AS (
                SELECT name, address, str, bank_name, mfo
                FROM organization  
                WHERE isdeleted = false AND user_id = $1
                ORDER BY name
            )
            SELECT 
                ARRAY_AGG(row_to_json(data)) AS data,
                COALESCE((SELECT COUNT(id) FROM organization WHERE isdeleted = false AND user_id = $1), 0)::INTEGER AS total_count
            FROM data
        `, [user_id]);
        return { data: rows[0]?.data || [], total: rows[0].total_count }
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode);
    }
}


const getByIdorganizationService = async (user_id, id, isdeleted = false, lang) => {
    try {
        let filter = ``
        if (!isdeleted) {
            filter = `AND o.isdeleted = false`
        }
        const result = await pool.query(`
            SELECT 
                o.id, 
                o.name, 
                o.address, 
                o.str, 
                o.bank_name, 
                o.mfo,
                COALESCE((
                    SELECT 
                        JSON_AGG(
                            JSON_BUILD_OBJECT(
                                'id',    g.id,
                                'gazna_number', g.gazna_number
                            )
                        )
                    FROM gazna_numbers g
                    WHERE g.isdeleted = false
                        AND g.organ_id = o.id
                ), '[]'::JSON) AS gazna_numbers,
                COALESCE((
                    SELECT 
                        JSON_AGG(
                            JSON_BUILD_OBJECT(
                                'id',    a.id,
                                'account_number', a.account_number
                            )
                        )
                    FROM  account_number a  
                    WHERE a.isdeleted = false
                        AND a.organ_id = o.id
                ), '[]'::JSON) AS account_numbers
            FROM organization o
            WHERE o.user_id = $1 
                AND o.id = $2 
                ${filter} 
        `, [user_id, id])
        if (!result.rows[0]) {
            throw new ErrorResponse(lang.t('organizationNotFound'), 404)
        }
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const deleteorganizationService = async (id) => {
    try {
        await pool.query(`UPDATE organization SET isdeleted = true WHERE id = $1 AND isdeleted = false`, [id])
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const getByStrOrganizationService = async (str, user_id, lang) => {
    try {
        const { rows } = await pool.query(`SELECT organization.* 
            FROM organization 
            WHERE str = $1 AND isdeleted = false AND user_id = $2
        `, [str, user_id])

        if (rows[0]) {
            throw new ErrorResponse(lang.t('organizationExists'), 409)
        }
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

module.exports = {
    organizationCreateService,
    getorganizationService,
    getByIdorganizationService,
    organizationUpdateService,
    deleteorganizationService,
    getByStrOrganizationService,
    excelDataOrganizationService
}
