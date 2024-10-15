const pool = require('../../config/db')
const ErrorResponse = require('../../utils/errorResponse')

const doerUpdateService = async (doer, user_id) => {
    try {
        const result = await pool.query(`UPDATE doer SET doer = $1 WHERE user_id = $2 AND isdeleted = false RETURNING *`, [doer, user_id])
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const getdoerService = async (user_id) => {
    try {
        const result = await pool.query(`SELECT id, doer FROM doer WHERE isdeleted = false AND user_id = $1`, [user_id])
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

module.exports = {
    getdoerService,
    doerUpdateService
}
