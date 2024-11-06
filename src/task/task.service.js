const pool = require('../config/db');
const ErrorResponse = require('../utils/errorResponse');

const getByIdTaskService = async (user_id, task_id, ignore_isdeleted = false) => {
    try {
        let condition = `WHERE t.id = $1 AND t.user_id = $2`;
        if (!ignore_isdeleted) {
            condition += ` AND t.isdeleted = false`;
        }
        const task = await pool.query(`
            SELECT 
                t.id, 
                t.batalon_id, 
                b.name AS batalon_name,
                t.task_time, 
                t.summa::FLOAT, 
                t.result_summa::FLOAT,
                t.discount_money::FLOAT,
                t.worker_number, 
                TO_CHAR(t.task_date, 'YYYY-MM-DD') AS task_date,
                ((t.task_time * t.worker_number) - COALESCE((SELECT SUM(task_time) FROM worker_task WHERE task_id = $1 AND isdeleted = false), 0)::FLOAT) AS remaining_task_time 
            FROM task AS t
            JOIN batalon AS b ON b.id = t.batalon_id 
            ${condition}
        `, [task_id, user_id]);

        if (!task.rows[0]) {
            throw new ErrorResponse('task not found', 404);
        }
        return task.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const getByContractIdTaskService = async (conrtact_id) => {
    try {
        const tasks = await pool.query(`
            SELECT 
                t.id, 
                t.batalon_id, 
                b.name AS batalon_name,
                t.task_time, 
                t.summa::FLOAT, 
                t.result_summa::FLOAT,
                t.discount_money::FLOAT,
                t.worker_number,
                TO_CHAR(t.task_date, 'YYYY-MM-DD') AS task_date,
                ((t.task_time * t.worker_number) - COALESCE((SELECT SUM(task_time) FROM worker_task WHERE contract_id = $1 AND isdeleted = false), 0)::FLOAT) AS remaining_task_time 
            FROM task AS t
            JOIN batalon AS b ON b.id = t.batalon_id 
            WHERE  t.contract_id = $1 AND t.isdeleted = false
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