const pool = require('../../config/db')
const ErrorResponse = require('../../utils/errorResponse')


const getRegionService = async () => {
    try {
        const data = await pool.query(`SELECT id, name FROM regions WHERE isdeleted = false`)
        return data.rows
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const getByIdRegionService = async (id) => {
    try {
        const data = await pool.query(`SELECT id, name FROM regions WHERE isdeleted = false AND id = $1`, [id])
        return data.rows
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}


module.exports = { getRegionService, getByIdRegionService }