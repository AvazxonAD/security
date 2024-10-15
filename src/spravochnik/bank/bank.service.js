const pool = require('../../config/db')
const ErrorResponse = require('../../utils/errorResponse')

const bankUpdateService = async (bank, user_id, mfo) => {
    try {
        const result = await pool.query(`UPDATE bank SET bank = $1, mfo = $3 WHERE user_id = $2 AND isdeleted = false RETURNING *`, [bank, user_id, mfo])
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const getbankService = async (user_id) => {
    try {
        const result = await pool.query(`SELECT id, bank, mfo FROM bank WHERE isdeleted = false AND user_id = $1`, [user_id])
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

module.exports = {
    getbankService,
    bankUpdateService
}
