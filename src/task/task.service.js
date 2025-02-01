const pool = require('../config/db');
const ErrorResponse = require('../utils/errorResponse');

const getByIdTaskService = async (user_id, task_id, ignore_isdeleted = false, batalon = false) => {
    try {
        let batalon_filter = ``
        if(batalon){
            batalon_filter = `AND b.birgada = false`
        }
        let condition = `WHERE t.id = $1 AND t.user_id = $2`;
        if (!ignore_isdeleted) {
            condition += ` AND t.isdeleted = false`;
        }
        const task = await pool.query(`
            SELECT 
                t.id, 
                t.batalon_id, 
                b.name AS batalon_name,
                b.birgada,
                t.task_time, 
                t.summa::FLOAT, 
                t.result_summa::FLOAT,
                t.discount_money::FLOAT,
                t.worker_number, 
                c.doc_num AS contract_number,
                TO_CHAR(t.task_date, 'YYYY-MM-DD') AS task_date,
                ((t.task_time * t.worker_number) - COALESCE((SELECT SUM(task_time) FROM worker_task WHERE task_id = $1 AND isdeleted = false), 0)::FLOAT) AS remaining_task_time,
                COALESCE((t.task_time * t.worker_number), 0) AS real_task_time
            FROM task t
            JOIN contract c ON c.id = t.contract_id 
            JOIN batalon b ON b.id = t.batalon_id 
            ${condition} ${batalon_filter}
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
                b.birgada,
                t.task_time, 
                t.summa::FLOAT, 
                t.result_summa::FLOAT,
                t.discount_money::FLOAT,
                t.worker_number,
                c.doc_num AS contract_number,
                TO_CHAR(t.task_date, 'YYYY-MM-DD') AS task_date,
                (   
                    (t.task_time * t.worker_number) - (
                        SELECT COALESCE(SUM(task_time), 0)
                        FROM worker_task 
                        WHERE task_id = t.id AND isdeleted = false
                        ) 
                ) AS remaining_task_time 
            FROM task AS t
            JOIN contract c ON c.id = t.contract_id 
            JOIN batalon AS b ON b.id = t.batalon_id 
            WHERE  t.contract_id = $1 AND t.isdeleted = false
        `, [conrtact_id])
        return tasks.rows
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const getTaskService = async (user_id, batalon_id, birgada) => {
    try {
        const params = [user_id]
        let batalon_filter = ``
        let birgada_filter = ``
        if(batalon_id){
            batalon_filter = `AND b.id = $${params.length + 1}`
            params.push(batalon_id)
        }
        if(birgada === 'false' || birgada === 'true'){
            birgada_filter = `AND b.birgada = ${birgada}`
        }
        const data = await pool.query(`
            SELECT 
                t.id, 
                c.id AS contract_id,
                t.batalon_id, 
                b.name AS batalon_name,
                b.birgada,
                t.task_time, 
                t.summa::FLOAT, 
                t.result_summa::FLOAT,
                t.discount_money::FLOAT,
                t.worker_number, 
                TO_CHAR(t.task_date, 'YYYY-MM-DD') AS task_date,
                ((t.task_time * t.worker_number) - COALESCE((SELECT SUM(task_time) FROM worker_task WHERE task_id = t.id AND isdeleted = false), 0)::FLOAT) AS remaining_task_time 
            FROM task AS t
            JOIN contract AS c ON c.id = t.contract_id
            JOIN batalon AS b ON b.id = t.batalon_id 
            WHERE t.user_id = $1 ${batalon_filter} ${birgada_filter}  AND t.isdeleted = false
            ORDER BY id DESC
        `, params);
        return data.rows
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

module.exports = {
    getByIdTaskService,
    getByContractIdTaskService,
    getTaskService
}