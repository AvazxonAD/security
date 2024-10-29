const pool = require('../config/db');
const ErrorResponse = require('../utils/errorResponse');


const getTaskTimeWorkerTaskService = async (task_id) => {
    try {
        const task_time = await pool.query(`SELECT SUM(task_time)::FLOAT FROM worker_tasks WHERE task_id = $1 AND isdeleted = false`, [task_id])
        return task_time.rows[0].sum
    } catch (error) {
        throw new ErrorResponse(error, error.statusCodes)
    }
}

const workerTaskCreateService = async (task, workers, all_task_time) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN'); 

        const promises = [];
        const one_time_summa = task.summa / task.worker_number / task.task_time;

        for (let worker of workers) {
            const summa = one_time_summa * worker.task_time;
            const query = `
                INSERT INTO worker_task(worker_id, task_id, summa, task_time) 
                VALUES($1, $2, $3, $4) RETURNING *`;
            promises.push(client.query(query, [worker.worker_id, task.id, summa, worker.task_time]));
        }

        const results = await Promise.all(promises);
        await client.query(`UPDATE task SET remaining_task_time = $1 WHERE id = $2`, [task.remaining_task_time - all_task_time, task.id]);

        await client.query('COMMIT'); 
        return results.map(result => result.rows[0]);
    } catch (error) {
        await client.query('ROLLBACK'); 
        throw new ErrorResponse(error.message, error.statusCode);
    } finally {
        client.release(); 
    }
};

const getByTaskIdWorkerTaskService = async (task_id) => {
    try {
        const workers = await pool.query(`
            SELECT w_t.id, w.fio, w_t.worker_id, w_t.task_time, w_t.summa
            FROM worker_task AS w_t
            JOIN worker AS w ON w.id = w_t.worker_id 
            WHERE w_t.task_id = $1 AND w_t.isdeleted = false
        `, [task_id])
        return workers.rows
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const getByIdWorkerTaskService = async (id, isdeleted = false) => {
    try {
        let ingore = ``
        if(!isdeleted){
            ingore = `AND w_t.isdeleted = false`
        }
        const workers = await pool.query(`
            SELECT w_t.id, w.fio, w_t.worker_id, w_t.task_time, w_t.summa, w_t.task_id
            FROM worker_task AS w_t
            JOIN worker AS w ON w.id = w_t.worker_id 
            WHERE w_t.id = $1 ${ingore}
        `, [id])
        if(!workers.rows[0]){
            throw new ErrorResponse('woker task not found', 404)
        }
        return workers.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const workerTaskUpdateService = async (id, worker_id, task_time, task, oldData) => {
    const client = await pool.connect()
    try {
        await client.query(`BEGIN`)
        const one_time_summa = task.summa / task.worker_number / task.task_time;
        const result = await client.query(
            `UPDATE worker_task SET worker_id = $1, summa = $2, task_time = $3 WHERE id = $4 AND isdeleted = false RETURNING *`,
            [worker_id, one_time_summa * task_time,  task_time, id]
        );
        await client.query(`UPDATE task SET remaining_task_time = $1 WHERE id = $2`, [(task.remaining_task_time + oldData.task_time) - task_time, task.id]);
        await client.query(`COMMIT`)
        return result.rows[0];
    } catch (error) {
        await client.query('ROLLBACK')
        throw new ErrorResponse(error.message, error.statusCode);
    } finally{
        client.release(); 
    }
};

const deleteWorkerTaskService = async (id, task, oldData) => {
    const client = await pool.connect()
    try {
        console.log(task.remaining_task_time + oldData.task_time, oldData.task_time)
        await client.query(`BEGIN`)
        await client.query(`UPDATE task SET remaining_task_time = $1 WHERE id = $2`, [task.remaining_task_time + oldData.task_time, oldData.task_id])
        const result = await client.query(`UPDATE worker_task SET isdeleted = true WHERE id = $1 AND isdeleted = false RETURNING *`,[id]);
        await client.query(`COMMIT`)
        return result.rows[0];
    } catch (error) {
        await client.query(`ROLLBACK`)
        throw new ErrorResponse(error.message, error.statusCode);
    } finally{
        client.release(); 
    }
};

const getByContractIdWorkerTaskService = async (contract_id) => {
    try {
        const result = await pool.query(`
            WITH data AS (
                SELECT w_t.id, b.name AS batalon_name, w.fio, w_t.summa, w_t.task_time
                FROM worker_task AS w_t
                JOIN task AS t ON w_t.task_id = t.id 
                JOIN batalon AS b ON b.id = t.batalon_id 
                JOIN worker AS w ON w_t.worker_id = w.id
                WHERE t.contract_id = $1 AND t.isdeleted = false AND w_t.isdeleted = false
            )
            SELECT ARRAY_AGG(row_to_json(data)) AS data,
            (SELECT doc_num FROM contract WHERE id = $1 AND isdeleted = false)
            FROM data
        `, [contract_id]);
        return {contract_number: result.rows[0].doc_num, worker_tasks: result.rows[0]?.data || []}
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

module.exports = {
    workerTaskCreateService,
    workerTaskUpdateService,
    deleteWorkerTaskService,
    getTaskTimeWorkerTaskService,
    getByTaskIdWorkerTaskService,
    getByIdWorkerTaskService,
    getByContractIdWorkerTaskService
};

