const { db } = require('@db/index');

exports.AccountNumberDB = class {
    static async getById(params, isdeleted) {
        const query = `
            SELECT id, account_number
            FROM account_number
            WHERE user_id = $1 
                AND id = $2
                ${!isdeleted ? 'AND isdeleted = false' : ''}        
        `;

        const result = db.query(query, params);

        return result[0];
    }
}

// const pool = require('../../config/db')
// const ErrorResponse = require('../../utils/errorResponse')

exports.account_numberCreateService = async (account_number, user_id) => {
    try {
        const result = await pool.query(`INSERT INTO account_number(account_number, user_id) VALUES($1, $2) RETURNING *`, [account_number, user_id])
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

exports.account_numberUpdateService = async (account_number, id) => {
    try {
        const result = await pool.query(`UPDATE account_number SET account_number = $1 WHERE id = $2 AND isdeleted = false RETURNING *`, [account_number, id])
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

exports.getaccount_numberService = async (user_id) => {
    try {
        const result = await pool.query(`SELECT id, account_number FROM account_number WHERE isdeleted = false AND user_id = $1`, [user_id])
        return result.rows
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

exports.getByIdaccount_numberService = async (user_id, id, ignore_deleted = false, lang) => {
    try {
        let ignore = ``
        if (!ignore_deleted) {
            ignore = `isdeleted = false AND`
        }
        const result = await pool.query(`SELECT id, account_number FROM account_number WHERE ${ignore} user_id = $1 AND id = $2`, [user_id, id])
        if (!result.rows[0]) {
            throw new ErrorResponse(lang.t('accountNumberNotFound'), 404)
        }
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

exports.getByaccount_numberaccount_numberService = async (user_id, account_number, lang) => {
    try {
        const result = await pool.query(`SELECT * FROM account_number WHERE isdeleted = false AND user_id = $1 AND account_number = $2`, [user_id, account_number])
        if (result.rows[0]) {
            throw new ErrorResponse(lang.t('accountNumberExists'), 404)
        }
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

exports.deleteaccount_numberService = async (id) => {
    try {
        await pool.query(`UPDATE account_number SET isdeleted = true WHERE id = $1 AND isdeleted = false RETURNING *`, [id])
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}