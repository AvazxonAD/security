const { db } = require('../db/index');


exports.BatalonDB = class {
    static async getById(params, isdeleted = null) {
        const result = await db.query(`
            SELECT id, name, address, str, bank_name, mfo, account_number,treasury1, treasury2, birgada
            FROM batalon 
            WHERE user_id = $1 
                AND id = $2
                ${!isdeleted ? 'AND isdeleted = false' : ''} 
        `, params);

        return result[0];
    }

    static async getByName(params, isdeleted = null) {
        const result = await db.query(`
            SELECT id, name, address, str, bank_name, mfo, account_number,treasury1, treasury2, birgada
            FROM batalon 
            WHERE user_id = $1 AND name = $2
        `, params);

        return result[0];
    }
}












const pool = require('../config/db')
const ErrorResponse = require('../utils/errorResponse')


exports.batalonCreateService = async (data) => {
    try {
        const result = await db.transaction(async client => {
            const batalon = await pool.query(`
                INSERT INTO batalon
                (
                    name, 
                    birgada, 
                    user_id, 
                    address, 
                    str, 
                    bank_name, 
                    mfo
                ) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [
                data.name,
                data.birgada,
                data.user_id,
                data.address,
                data.str,
                data.bank_name,
                data.mfo
            ])

            for (let account of data.account_numbers) {
                const query = `
                    INSERT INTO 
                        account_number(
                            account_number, 
                            batalon_id
                        ) 
                    VALUES($1, $2) RETURNING *
                `;
                await client.query(query, [account.account_number, batalon.rows[0].id])
            }

            for (let gazna of data.gazna_numbers) {
                const query = `
                    INSERT INTO 
                        gazna_numbers(
                            gazna_number, 
                            batalon_id
                        ) 
                    VALUES($1, $2) RETURNING *
                `;
                await client.query(query, [gazna.gazna_number, batalon.rows[0].id])
            }

            return batalon.rows[0];
        })

        return result;
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

exports.batalonUpdateService = async (data) => {
    try {
        const result = await db.transaction(async (client) => {
            const batalon = await pool.query(`UPDATE batalon SET 
                name = $1, 
                birgada = $2,
                address = $3, 
                str = $4, 
                bank_name = $5, 
                mfo = $6
                WHERE id = $7 
                    AND isdeleted = false 
                RETURNING *
            `, [
                data.name,
                data.birgada,
                data.address,
                data.str,
                data.bank_name,
                data.mfo,
                data.id
            ])

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
                    INSERT INTO gazna_numbers(gazna_number, batalon_id) 
                    VALUES($1, $2) RETURNING *
                `, [gazna.gazna_number, batalon.rows[0].id]);
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
                    INSERT INTO account_number(account_number, batalon_id) 
                    VALUES($1, $2) RETURNING *
                `, [account_number.account_number, batalon.rows[0].id]);
            }

            return batalon.rows[0];
        });

        return result;
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

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
            `
            params.push(search)
        }

        if (birgada) {
            params.push(birgada);
            birgada_filter = `AND b.birgada = $${params.length}`;
        }

        const { rows } = await pool.query(`
            SELECT 
                b.id, 
                b.name, 
                b.address, 
                b.str, 
                b.bank_name, 
                b.mfo,
                b.birgada,
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
                        AND g.batalon_id = b.id
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
                        AND a.batalon_id = b.id
                ), '[]'::JSON) AS account_numbers
            FROM batalon b
            WHERE b.isdeleted = false 
                AND b.user_id = $1 
                ${search_filter}
                ${birgada_filter}
            ORDER BY b.id DESC, b.name
        `, params);

        return { data: rows }
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode);
    }
}

exports.getByIdBatalonService = async (user_id, id, birgada = false, batalon = false, lang) => {
    try {
        const result = await pool.query(`
            SELECT 
                b.id, 
                b.name, 
                b.address, 
                b.str, 
                b.bank_name, 
                b.mfo,
                b.birgada,
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
                        AND g.batalon_id = b.id
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
                        AND a.batalon_id = b.id
                ), '[]'::JSON) AS account_numbers
            FROM batalon b
            WHERE b.user_id = $1 
                AND b.id = $2 
        `, [user_id, id])
        if (!result.rows[0]) {
            throw new ErrorResponse(lang.t('batalonNotFound'), 404)
        }
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

exports.getByNameBatalonService = async (user_id, name, check = true, lang) => {
    try {
        const result = await pool.query(`SELECT id, name, address, str, bank_name, mfo, account_number,treasury1, treasury2, birgada
            FROM batalon WHERE isdeleted = false AND user_id = $1 AND name = $2
        `, [user_id, name])
        if (check) {
            if (result.rows[0]) {
                throw new ErrorResponse(lang.t('batalonExists'), 409)
            }
        } else {
            if (!result.rows[0]) {
                throw new ErrorResponse(lang.t('batalonNotFound'), 404)
            }
        }
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

exports.deleteBatalonService = async (id) => {
    try {
        const result = await pool.query(`UPDATE batalon SET isdeleted = true WHERE id = $1 AND isdeleted = false RETURNING *`, [id])
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

exports.getOnlyBatalon = async (user_id) => {
    try {
        const result = await pool.query(`SELECT id, name FROM batalon WHERE isdeleted = false AND user_id = $1 AND birgada = false`, [user_id])
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}