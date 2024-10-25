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
            WHERE w_t.task_id = $1 
        `, [task_id])
        return workers.rows
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const getWorkerTaskByIdService = async (id) => {
    try {
        const workers = await pool.query(`
            SELECT w_t.id, w.fio, w_t.worker_id, w_t.task_time, w_t.summa, w_t.task_id
            FROM worker_task AS w_t
            JOIN worker AS w ON w.id = w_t.worker_id 
            WHERE w_t.id = $1 
        `, [id])
        if(!workers.rows[0]){
            throw new ErrorResponse('woker not found', 404)
        }
        return workers.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

// worker_taskni yangilash
const workerTaskUpdateService = async (id, worker_id, task_time, task) => {
    const client = await pool.connect()
    try {
        await client.query(`BEGIN`)
        const one_time_money = task.summa / task_time / task.worker_number
        const result = await client.query(
            `UPDATE worker_task SET worker_id = $1, summa = $2, task_time = $3 WHERE id = $4 AND isdeleted = false RETURNING *`,
            [worker_id, one_time_money * task_time,  task_time, id]
        );
        await client.query(`UPDATE task SET remaining_task_time = $1 WHERE id = $2`, [task.remaining_task_time - task_time, task.id]);
        await client.query(`COMMIT`)
        return result.rows[0];
    } catch (error) {
        await client.query('ROLLBACK')
        throw new ErrorResponse(error.message, error.statusCode);
    }
};

// worker_taskni o'chirish
const deleteWorkerTaskService = async (id) => {
    try {
        const result = await pool.query(`
            UPDATE worker_task SET isdeleted = true WHERE id = $1 AND isdeleted = false RETURNING *`,
            [id]
        );
        return result.rows[0];
    } catch (error) {
        throw new ErrorResponse(error.message, error.statusCode);
    }
};

module.exports = {
    workerTaskCreateService,
    workerTaskUpdateService,
    deleteWorkerTaskService,
    getTaskTimeWorkerTaskService,
    getByTaskIdWorkerTaskService,
    getWorkerTaskByIdService
};

