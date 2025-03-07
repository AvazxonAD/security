const pool = require('../config/db');
const ErrorResponse = require('../utils/errorResponse');

const workerTaskCreateService = async (task, workers) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const promises = [];
        const one_time_summa = task.result_summa / task.worker_number / task.task_time;
        for (let worker of workers) {
            const summa = one_time_summa * worker.task_time;
            const query = `INSERT INTO worker_task(worker_id, task_id, summa, task_time) VALUES($1, $2, $3, $4) RETURNING *`;
            promises.push(client.query(query, [worker.worker_id, task.id, summa, worker.task_time]));
        }
        const results = await Promise.all(promises);
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
            SELECT 
                w_t.worker_id, 
                w.fio, 
                SUM(w_t.summa)::FLOAT AS summa, 
                SUM(w_t.task_time) AS task_time
            FROM worker_task AS w_t
            JOIN worker AS w ON w.id = w_t.worker_id 
            WHERE w_t.task_id = $1 AND w_t.isdeleted = false
            GROUP BY w.fio, w_t.worker_id
        `, [task_id]);
        return workers.rows;
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
            [worker_id, one_time_summa * task_time, task_time, id]
        );
        await client.query(`UPDATE task SET remaining_task_time = $1 WHERE id = $2`, [(task.remaining_task_time + oldData.task_time) - task_time, task.id]);
        await client.query(`COMMIT`)
        return result.rows[0];
    } catch (error) {
        await client.query('ROLLBACK')
        throw new ErrorResponse(error.message, error.statusCode);
    } finally {
        client.release();
    }
};

const deleteWorkerTaskService = async (worker_id, task_id) => {
    try {
        await pool.query(`UPDATE worker_task SET isdeleted = true WHERE worker_id = $1 AND isdeleted = false AND task_id = $2 RETURNING *`, [worker_id, task_id]);
    } catch (error) {
        throw new ErrorResponse(error.message, error.statusCode);
    }
};

const getByContractIdWorkerTaskService = async (contract_id) => {
    try {
        const result = await pool.query(`
            SELECT 
                w_t.worker_id, 
                w.fio, 
                SUM(w_t.summa) AS summa, 
                SUM(w_t.task_time) AS task_time
            FROM worker_task AS w_t
            JOIN worker AS w ON w.id = w_t.worker_id 
            JOIN task AS t ON t.id = w_t.task_id
            WHERE t.contract_id = $1 AND w_t.isdeleted = false
            GROUP BY w.fio, w_t.worker_id
        `, [contract_id]);
        return { worker_tasks: result.rows || [] }
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const getByTaskIdANDWorkerIdWorkerTaskService = async (task_id, worker_id, lang) => {
    try {
        const worker = await pool.query(`
            SELECT w.id, w.fio, w.batalon_id, SUM(w_t.summa)
            FROM worker_task w_t
            JOIN worker AS w ON w.id = w_t.worker_id 
            WHERE w_t.task_id = $1 AND w_t.isdeleted = false AND w_t.worker_id = $2
            GROUP BY w.id, w.fio, w.batalon_id
        `, [task_id, worker_id])
        if (!worker.rows[0]) {
            throw new ErrorResponse(lang.t('docNotFound'), 404)
        }
        return worker.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const deleteByTaskIDWorkerTaskService = async (task_id) => {
    try {
        await pool.query(`UPDATE worker_task SET isdeleted = true WHERE task_id = $1`, [task_id])
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

module.exports = {
    workerTaskCreateService,
    workerTaskUpdateService,
    deleteWorkerTaskService,
    getByTaskIdWorkerTaskService,
    getByContractIdWorkerTaskService,
    getByTaskIdANDWorkerIdWorkerTaskService,
    deleteByTaskIDWorkerTaskService
};

