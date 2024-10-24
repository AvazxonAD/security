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

// worker_taskni yangilash
const workerTaskUpdateService = async (worker_id, task_id, summa, id, task_time) => {
    try {
        const result = await pool.query(
            `UPDATE worker_task SET worker_id = $1, task_id = $2, summa = $3, task_time = $5 WHERE id = $4 AND isdeleted = false RETURNING *`,
            [worker_id, task_id, summa, id, task_time]
        );
        return result.rows[0];
    } catch (error) {
        throw new ErrorResponse(error.message, error.statusCode);
    }
};

// worker_taskni olish
const getWorkerTasksService = async (conrtact_id, offset, limit) => {
    try {
        const { rows } = await pool.query(`
            WITH data AS (
                SELECT wt.id, wt.summa, w.fio AS worker_name, t.name AS task_name, 
                FROM worker_task wt
                JOIN worker w ON w.id = wt.worker_id
                JOIN task t ON t.id = wt.task_id
                WHERE wt.isdeleted = false
            )
            SELECT 
                ARRAY_AGG(row_to_json(data)) AS data,
                COALESCE(
                    (SELECT COUNT(wt.id)
                    FROM worker_task wt
                    WHERE wt.isdeleted = false
                    ), 0
                )::INTEGER AS total_count
            FROM data
            WHERE conrtact_id = $1OFFSET $2 LIMIT $3
        `, [conrtact_id, offset, limit]);

        return { data: rows[0].data, total: rows[0].total_count };
    } catch (error) {
        throw new ErrorResponse(error.message, error.statusCode);
    }
};

// worker_taskni ID bo'yicha olish
const getWorkerTaskByIdService = async (user_id, id) => {
    try {
        const result = await pool.query(`
            SELECT wt.id, wt.summa, w.fio AS worker_name, t.name AS task_name
            FROM worker_task wt
            JOIN worker w ON w.id = wt.worker_id
            JOIN task t ON t.id = wt.task_id
            WHERE wt.id = $1 AND wt.isdeleted = false
        `, [id]);

        if (!result.rows[0]) {
            throw new ErrorResponse('Worker task not found', 404);
        }
        return result.rows[0];
    } catch (error) {
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
    getWorkerTasksService,
    getWorkerTaskByIdService,
    deleteWorkerTaskService,
    getTaskTimeWorkerTaskService
};

