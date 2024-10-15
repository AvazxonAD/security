const pool = require('../../config/db')
const ErrorResponse = require('../../utils/errorResponse')

const adressUpdateService = async (adress, user_id) => {
    try {
        const result = await pool.query(`UPDATE adress SET adress = $1 WHERE user_id = $2 AND isdeleted = false RETURNING *`, [adress, user_id])
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const getadressService = async (user_id) => {
    try {
        const result = await pool.query(`SELECT id, adress FROM adress WHERE isdeleted = false AND user_id = $1`, [user_id])
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

module.exports = {
    getadressService,
    adressUpdateService
}
