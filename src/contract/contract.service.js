const pool = require('../config/db')
const ErrorResponse = require('../utils/errorResponse')

const contractCreateService = async (data) => {
    try {
        let all_worker_number = 0
        let all_task_time = 0
        let discount = 0
        let summa = 0
        data.tasks.forEach(element => {
            all_task_time += element.task_time 
            all_worker_number += element.worker_number
            summa += element.task_time * element.worker_number * data.bxm.summa
        });
        if(data.discount){
            discount = summa * (data.discount / 100)
            summa = summa - discount
        }
        const { rows } = await pool.query(`
            INSERT INTO contract(
                doc_num, 
                doc_date, 
                period, 
                adress, 
                start_date, 
                end_date, 
                discount, 
                summa, 
                payment, 
                payment_date, 
                organization_id, 
                account_number_id,
                user_id,
                start_time,
                end_time,
                all_worker_number,
                all_task_time
            ) 
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *
        `, [
            data.doc_num,
            data.doc_date,
            data.period,
            data.adress,
            data.start_date,
            data.end_date,
            discount,
            summa,
            data.payment,
            data.payment_date,
            data.organization_id,
            data.account_number_id,
            data.user_id,
            data.start_time,
            data.end_time,
            all_worker_number, 
            all_task_time
        ])
        const contract = rows[0]
        const tasks = []
        for (let task of data.tasks) {
            let summa = 0
            summa = task.task_time * task.worker_number * data.bxm.summa
            if(data.discount){
                summa = summa - (summa * (data.discount / 100))
            }
            const { rows } = await pool.query(`INSERT INTO 
                task(contract_id, batalon_id, task_time, worker_number, summa, user_id, task_date) 
                VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING * 
            `, [contract.id, task.batalon_id, task.task_time, task.worker_number, summa, data.user_id, task.task_date])
            tasks.push(rows[0])
        }
        contract.tasks = tasks
        return contract
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const contractUpdateService = async (data) => {
    try {
        let all_worker_number = 0
        let all_task_time = 0
        let discount = 0
        let summa = 0
        data.tasks.forEach(element => {
            all_task_time += element.task_time 
            all_worker_number += element.worker_number
            summa += element.task_time * element.worker_number * data.bxm.summa
        });
        if(data.discount){
            discount = summa * (data.discount / 100)
            summa = summa - discount
        }
        const { rows } = await pool.query(`
            UPDATE contract SET 
                doc_num = $1, 
                doc_date = $2, 
                period = $3, 
                adress = $4, 
                start_date = $5, 
                end_date = $6, 
                discount = $7, 
                summa = $8, 
                payment = $9, 
                payment_date = $10, 
                organization_id = $11, 
                account_number_id = $12,
                start_time = $13,
                end_time = $14,
                all_worker_number = $15,
                all_task_time = $16 
                WHERE id = $17 AND isdeleted = false RETURNING *
        `, [
            data.doc_num,
            data.doc_date,
            data.period,
            data.adress,
            data.start_date,
            data.end_date,
            discount,
            summa,
            data.payment,
            data.payment_date,
            data.organization_id,
            data.account_number_id,
            data.start_time,
            data.end_time,
            all_worker_number, 
            all_task_time,
            data.id
        ])
        await pool.query(`DELETE FROM task WHERE contract_id = $1`, [data.id])
        const contract = rows[0]
        const tasks = []
        for (let task of data.tasks) {
            let summa = 0
            summa = task.task_time * task.worker_number * data.bxm.summa
            if(data.discount){
                summa = summa - (summa * (data.discount / 100))
            }
            const { rows } = await pool.query(`INSERT INTO 
                task(contract_id, batalon_id, task_time, worker_number, summa, user_id, task_date) 
                VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING * 
            `, [contract.id, task.batalon_id, task.task_time, task.worker_number, summa, data.user_id, task.task_date])
            tasks.push(rows[0])
        }
        contract.tasks = tasks
        return contract
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const getcontractService = async (user_id, offset, limit, search) => {
    try {
        let serach_filter = ``;
        const params = [user_id, offset, limit];
        if (search) {
            serach_filter = `AND (
                    c.doc_num ILIKE  '%' || $${params.length + 1} || '%' 
                    OR c.summa ILIKE  '%' || $${params.length + 1} || '%' 
                    OR o.inn ILIKE  '%' || $${params.length + 1} || '%'
                    OR o.name ILIKE  '%' || $${params.length + 1} || '%'
                    OR o.account_number ILIKE  '%' || $${params.length + 1} || '%'
                )
            `
            params.push(search)
        }
        const { rows } = await pool.query(`
            WITH data AS (
                SELECT 
                    c.id,
                    c.doc_num, 
                    c.doc_date, 
                    c.period, 
                    c.adress, 
                    c.start_date, 
                    c.end_date, 
                    c.discount, 
                    c.summa, 
                    c.payment, 
                    c.payment_date, 
                    c.organization_id, 
                    c.account_number_id,
                    c.start_time,
                    c.end_time,
                    c.all_worker_number,
                    c.all_task_time,
                    (SELECT ARRAY_AGG(row_to_json(tasks))
                        FROM (
                        SELECT 
                            t.id,
                            t.batalon_id, 
                            t.task_time, 
                            t.worker_number, 
                            t.summa, 
                            t.task_date
                        FROM task AS t
                        WHERE  t.user_id = $1 AND t.isdeleted = false AND t.contract_id = c.id 
                        ) AS tasks
                    ) AS tasks 
                FROM contract  AS c 
                JOIN organization AS o ON o.id = c.organization_id
                WHERE c.isdeleted = false AND c.user_id = $1 ${serach_filter}
                ORDER BY c.doc_date OFFSET $2 LIMIT $3
            )
            SELECT 
                ARRAY_AGG(row_to_json(data)) AS data,
                COALESCE((SELECT COUNT(id) FROM contract WHERE isdeleted = false AND user_id = $1), 0)::INTEGER AS total_count
            FROM data
        `, params);
        return { data: rows[0]?.data || [], total: rows[0].total_count }
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode);
    }
}



const getByIdcontractService = async (user_id, id, isdeleted = false) => {
    try {
        let filter = ``
        if (!isdeleted) {
            filter = `AND c.isdeleted = false`
        }
        const result = await pool.query(`
            SELECT 
                c.id,
                c.doc_num, 
                c.doc_date, 
                c.period, 
                c.adress, 
                c.start_date, 
                c.end_date, 
                c.discount, 
                c.summa, 
                c.payment, 
                c.payment_date, 
                c.organization_id, 
                c.account_number_id,
                c.start_time,
                c.end_time,
                c.all_worker_number,
                c.all_task_time,
                (SELECT ARRAY_AGG(row_to_json(tasks))
                    FROM (
                    SELECT 
                        t.id,
                        t.batalon_id, 
                        t.task_time, 
                        t.worker_number, 
                        t.summa, 
                        t.task_date
                    FROM task AS t
                    WHERE  t.user_id = $1 AND t.isdeleted = false AND t.contract_id = c.id 
                    ) AS tasks
                ) AS tasks 
            FROM contract  AS c 
            JOIN organization AS o ON o.id = c.organization_id
            WHERE c.user_id = $1 ${filter} AND c.id = $2 
        `, [user_id, id])
        if (!result.rows[0]) {
            throw new ErrorResponse('contract not found', 404)
        }
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const deletecontractService = async (id) => {
    try {
        await pool.query(`UPDATE task SET isdeleted = true WHERE contract_id = $1 AND isdeleted = false`, [id])
        await pool.query(`UPDATE contract SET isdeleted = true WHERE id = $1 AND isdeleted = false`, [id])
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

module.exports = {
    contractCreateService,
    getcontractService,
    getByIdcontractService,
    contractUpdateService,
    deletecontractService
}
