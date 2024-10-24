const pool = require('../config/db');
const ErrorResponse = require('../utils/errorResponse');

const getByIdTaskService = async (task_id) => {
    try {
        const task = await pool.query(`SELECT * FROM task WHERE isdeleted = false AND id = $1`, [task_id])
        if(!task.rows[0]){
            throw new ErrorResponse('task not found', 404)
        }
        return task.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

module.exports = { getByIdTaskService }