const { query } = require('express')
const pool = require('../config/db')
const ErrorResponse = require('../utils/errorResponse')


const workerCreateService = async (fio, batalon_id, account_number) => {
    try {
        const result = await pool.query(`INSERT INTO worker(fio, batalon_id, account_number) VALUES($1, $2, $3) RETURNING *`, [fio, batalon_id, account_number])
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const workerUpdateService = async (fio, batalon_id, account_number, id) => {
    try {
        const result = await pool.query(`UPDATE worker SET fio = $1, batalon_id = $2, account_number = $3 WHERE id = $4 AND isdeleted = false RETURNING *
        `, [fio, batalon_id, account_number, id])
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const getworkerService = async (user_id, search, batalon_id, offset, limit) => {
    try {
        let filter = ``;
        let batalon_filter = ``;
        const params = [user_id, offset, limit];
        if (search) {
            filter = `AND (w.fio ILIKE  '%' || $${params.length + 1} || '%' 
                OR w.account_number ILIKE  '%' || $${params.length + 1} || '%') 
            `
            params.push(search)
        }
        if (batalon_id) {
            batalon_filter = `AND b.id = $${params.length + 1}`
            params.push(batalon_id)
        }
        const { rows } = await pool.query(`
           WITH data AS (
                SELECT w.id, w.fio, w.account_number, b.name AS batalon_name
                FROM worker w 
                JOIN batalon AS b ON b.id = w.batalon_id
                JOIN users AS u ON b.user_id = u.id
                WHERE w.isdeleted = false AND u.id = $1 ${filter} ${batalon_filter} OFFSET $2 LIMIT $3
            )
            SELECT 
                ARRAY_AGG(row_to_json(data)) AS data,
                COALESCE(
                    (SELECT COUNT(w.id)
                    FROM worker w 
                    JOIN batalon AS b ON b.id = w.batalon_id
                    JOIN users AS u ON b.user_id = u.id
                    WHERE w.isdeleted = false AND u.id = $1 ${filter} ${batalon_filter}
                    ), 0
                )::INTEGER AS total_count
            FROM data
        `, params);

        return {data: rows[0]?.data || [], total: rows[0].total_count}
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode);
    }
}

const excelDataWorkerService = async (user_id) => {
    try {
        const { rows } = await pool.query(`
            WITH data AS (
                 SELECT w.fio, w.account_number, b.name AS batalon_name
                 FROM worker w 
                 JOIN batalon AS b ON b.id = w.batalon_id
                 JOIN users AS u ON b.user_id = u.id
                 WHERE w.isdeleted = false AND u.id = $1 
             )
             SELECT 
                 ARRAY_AGG(row_to_json(data)) AS data,
                 COALESCE(
                     (SELECT COUNT(w.id)
                     FROM worker w 
                     JOIN batalon AS b ON b.id = w.batalon_id
                     JOIN users AS u ON b.user_id = u.id
                     WHERE w.isdeleted = false AND u.id = $1
                     ), 0
                 )::INTEGER AS total_count
             FROM data
         `, [user_id]);
         return {data: rows[0]?.data || [], total: rows[0].total_count}
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}


const getByIdworkerService = async (user_id, id, isdeleted = false) => {
    try {
        let filter = ``
        if (!isdeleted) {
            filter = `AND w.isdeleted = false`
        }
        const result = await pool.query(`
            SELECT w.id, w.fio, w.account_number, b.name AS batalon_name
            FROM worker w 
            JOIN batalon AS b ON b.id = w.batalon_id
            JOIN users AS u ON b.user_id = u.id
            WHERE u.id = $1 AND w.id = $2 ${filter}
        `, [user_id, id])
        if (!result.rows[0]) {
            throw new ErrorResponse('worker not found', 404)
        }
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const deleteworkerService = async (id) => {
    try {
        const result = await pool.query(`UPDATE worker SET isdeleted = true WHERE id = $1 AND isdeleted = false RETURNING *`, [id])
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const getByAcountNumberWorkerService = async (account_number) => {
    try {
        const { rows } = await pool.query(`SELECT * FROM worker WHERE account_number = $1 AND isdeleted = false`, [account_number])
        if (rows[0]) {
            throw new ErrorResponse('This account number is already entered', 409)
        }
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const getByBatalonIdAndIdWorkerService = async (batalon_id, worker_id) => {
    try {
        const worker = await pool.query(`SELECT * FROM worker WHERE id = $1 AND isdeleted = false AND batalon_id = $2`, [worker_id, batalon_id])
        if(!worker.rows[0]){
            throw new ErrorResponse('worker not found', 404)
        }
        return worker.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const excelDataCreateWorkerService = async (data, user_id) => {
    const client = await pool.connect();
    try {
      await client.query(`BEGIN`);
      const createWorkerQueries = [];
      for (let worker of data) {
        const workerQuery = client.query(
          `INSERT INTO worker(fio, batalon_id, account_number) VALUES($1, $2, $3) RETURNING *`,
          [worker.fio, worker.batalon_id, worker.account_number]
        );
        createWorkerQueries.push(workerQuery);
      }
      const workers = await Promise.all(createWorkerQueries);
      const result = workers.map(item => item.rows[0])
      await client.query(`COMMIT`);
      return result;
    } catch (error) {
      await client.query(`ROLLBACK`);
      throw new ErrorResponse(error.message, error.statusCode);
    } finally {
      client.release();
    }
  };
  

module.exports = {
    workerCreateService,
    getworkerService,
    getByIdworkerService,
    workerUpdateService,
    deleteworkerService,
    getByAcountNumberWorkerService,
    getByBatalonIdAndIdWorkerService,
    excelDataWorkerService,
    excelDataCreateWorkerService
}
