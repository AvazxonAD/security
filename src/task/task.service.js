const pool = require('../config/db');
const ErrorResponse = require('../utils/errorResponse');

const getByIdTaskService = async (user_id, task_id, ignore_isdeleted = false) => {
    try {
        let ignore = ``
        if (!ignore_isdeleted) {
            ignore = ` AND isdeleted = false`
        }
        const task = await pool.query(`
            SELECT id, batalon_id, task_time, summa, worker_number, remaining_task_time 
            FROM task WHERE  id = $1 AND user_id = $2 ${ignore}
        `, [task_id, user_id])
        if (!task.rows[0]) {
            throw new ErrorResponse('task not found', 404)
        }
        return task.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const getByContractIdTaskService = async (conrtact_id) => {
    try {
        const tasks = await pool.query(`
            SELECT id, batalon_id, task_time, summa, worker_number, remaining_task_time 
            FROM task WHERE  contract_id = $1 AND isdeleted = false
        `, [conrtact_id])
        return tasks.rows
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

module.exports = {
    getByIdTaskService,
    getByContractIdTaskService
}