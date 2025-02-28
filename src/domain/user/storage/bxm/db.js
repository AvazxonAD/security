const pool = require('../../config/db')
const ErrorResponse = require('../../utils/errorResponse');
const { db } = require('../../db/index');


const BxmDB = class {
    static async deleteBxm(params) {
        const query = `UPDATE bxm SET isdeleted = true WHERE id = $1 RETURNING id`;
        
        const result = await db.query(query, params);
        
        return result[0];
    }

    static async getByIdBxm(params) {
        const query = `SELECT id, summa::FLOAT FROM bxm WHERE isdeleted = false AND user_id = $1 AND id = $2`;
        
        const result = await db.query(query, params);
        
        return result[0];
    }
};


const bxmUpdateService = async (summa, id, user_id, lang) => {
    try {
        const result = await pool.query(`UPDATE bxm SET summa = $1 WHERE id = $2 AND isdeleted = false AND user_id = $3 RETURNING *`, [summa, id, user_id])

        if (!result.rows[0]) {
            throw new ErrorResponse(lang.t('bxmFound'), 404)
        }

        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const getbxmService = async (user_id) => {
    try {
        const result = await pool.query(`SELECT id, summa::FLOAT FROM bxm WHERE isdeleted = false AND user_id = $1`, [user_id])

        for (let bxm of result.rows) {
            bxm.bxm_07 = Math.round(bxm.summa * 0.07 * 100) / 100;
        }

        return result.rows;
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const getByIdBxmService = async (user_id, id, lang) => {
    try {
        const result = await pool.query(`SELECT id, summa::FLOAT FROM bxm WHERE isdeleted = false AND user_id = $1 AND id = $2`, [user_id, id])
        if (!result.rows[0]) {
            throw new ErrorResponse(lang.t('bxmNotFound'), 404);
        }

        result.rows[0].bxm_07 = Math.round(result.rows[0].summa * 0.07 * 100) / 100;

        return result.rows[0];
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const createBxmService = async (user_id, summa) => {
    try {
        const result = await pool.query('INSERT INTO bxm(user_id, summa) VALUES($1, $2) RETURNING * ', [user_id, summa])

        return result.rows[0];
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}


module.exports = {
    getbxmService,
    bxmUpdateService,
    getByIdBxmService,
    createBxmService,
    BxmDB
}
