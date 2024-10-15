const pool = require('../../config/db')
const ErrorResponse = require('../../utils/errorResponse')

const bossUpdateService = async (boss, user_id) => {
    try {
        const result = await pool.query(`UPDATE boss SET boss = $1 WHERE user_id = $2 AND isdeleted = false RETURNING *`, [boss, user_id])
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const getbossService = async (user_id) => {
    try {
        const result = await pool.query(`SELECT id, boss FROM boss WHERE isdeleted = false AND user_id = $1`, [user_id])
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

module.exports = {
    getbossService,
    bossUpdateService
}
