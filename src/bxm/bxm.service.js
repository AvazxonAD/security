const pool = require('../config/db')
const ErrorResponse = require('../utils/errorResponse')

const bxmUpdateService = async (summa, id, user_id) => {
    try {
        const result = await pool.query(`UPDATE bxm SET summa = $1 WHERE id = $2 AND isdeleted = false AND user_id = $3 RETURNING *`, [summa,  id, user_id])
        if(!result.rows[0]){
            throw new ErrorResponse('bxm not found', 404)
        }
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const getbxmService = async (user_id) => {
    try {
        const result = await pool.query(`SELECT id, summa::FLOAT FROM bxm WHERE isdeleted = false AND user_id = $1`, [user_id])
        if(!result.rows[0]){
            throw new ErrorResponse('bxm not found', 404)
        }
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}


module.exports = {
    getbxmService,
    bxmUpdateService
}
