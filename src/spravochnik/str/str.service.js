const pool = require('../../config/db')
const ErrorResponse = require('../../utils/errorResponse')

const strUpdateService = async (str, user_id) => {
    try {
        const result = await pool.query(`UPDATE str SET str = $1 WHERE user_id = $2 AND isdeleted = false RETURNING *`, [str, user_id])
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const getstrService = async (user_id) => {
    try {
        const result = await pool.query(`SELECT id, str FROM str WHERE isdeleted = false AND user_id = $1`, [user_id])
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

module.exports = {
    getstrService,
    strUpdateService
}
