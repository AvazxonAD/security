const { db } = require('../db/index');


exports.BatalonDB = class {
    static async batalonGetById(params, isdeleted = null) {
        const result = await db.query(`
            SELECT id, name, address, str, bank_name, mfo, account_number,treasury1, treasury2, birgada
            FROM batalon 
            WHERE user_id = $1 
                AND id = $2
                ${!isdeleted ? 'AND isdeleted = false' : ''} 
        `, params);

        return result[0];
    }

    static async batalonGetByName(params, isdeleted = null) {
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
        const result = await pool.query(`INSERT INTO batalon
            (
                name, 
                birgada, 
                user_id, 
                address, 
                str, 
                bank_name, 
                mfo, 
                account_number,
                treasury1,
                treasury2 
            ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`, [
            data.name,
            data.birgada,
            data.user_id,
            data.address,
            data.str,
            data.bank_name,
            data.mfo,
            data.account_number,
            data.treasury1,
            data.treasury2
        ])
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

exports.batalonUpdateService = async (data) => {
    try {
        const result = await pool.query(`UPDATE batalon SET 
            name = $1, 
            birgada = $2,
            address = $3, 
            str = $4, 
            bank_name = $5, 
            mfo = $6, 
            account_number = $7,
            treasury1 = $8,
            treasury2 = $9  
            WHERE id = $10 AND isdeleted = false RETURNING *
        `, [
            data.name,
            data.birgada,
            data.address,
            data.str,
            data.bank_name,
            data.mfo,
            data.account_number,
            data.treasury1,
            data.treasury2,
            data.id,
        ])
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

exports.getBatalonService = async (user_id, birgada = false) => {
    try {
        let birgada_filter = ``
        if (birgada === 'true' || birgada === 'false') {
            birgada_filter = `AND birgada = ${birgada}`
        }
        const result = await pool.query(`SELECT id, name, address, str, bank_name, mfo, account_number,treasury1, treasury2, birgada 
            FROM batalon WHERE isdeleted = false AND user_id = $1 ${birgada_filter}
        `, [user_id])
        return result.rows
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

exports.getByIdBatalonService = async (user_id, id, birgada = false, batalon = false, lang) => {
    try {
        birgada_filter = ``
        batalon_filter = ``
        if (birgada) {
            birgada_filter = `AND birgada = true`
        }
        if (batalon) {
            batalon_filter = `AND birgada = false`
        }
        const result = await pool.query(`SELECT id, name, address, str, bank_name, mfo, account_number,treasury1, treasury2, birgada
            FROM batalon WHERE isdeleted = false AND user_id = $1 AND id = $2 ${birgada_filter} ${batalon_filter}
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