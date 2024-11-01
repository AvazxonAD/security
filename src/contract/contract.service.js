const pool = require('../config/db')
const ErrorResponse = require('../utils/errorResponse')

const contractCreateService = async (data) => {
    try {
        let all_worker_number = 0
        let all_task_time = 0
        let discount_money = 0
        let summa = 0
        data.tasks.forEach(element => {
            all_task_time += element.task_time 
            all_worker_number += element.worker_number
            summa += element.task_time * element.worker_number * data.bxm.summa
        });
        if(data.discount){
            discount_money = summa * (data.discount / 100)
            summa = summa - discount_money
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
                organization_id, 
                account_number_id,
                user_id,
                start_time,
                end_time,
                all_worker_number,
                all_task_time,
                remaining_balance,
                discount_money
            ) 
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *
        `, [
            data.doc_num,
            data.doc_date,
            data.period,
            data.adress,
            data.start_date,
            data.end_date,
            data.discount,
            summa,
            data.organization_id,
            data.account_number_id,
            data.user_id,
            data.start_time,
            data.end_time,
            all_worker_number, 
            all_task_time,
            summa,
            discount_money
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
                task(contract_id, batalon_id, task_time, worker_number, summa, user_id, task_date, remaining_task_time) 
                VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING * 
            `, [contract.id, task.batalon_id, task.task_time, task.worker_number, summa, data.user_id, task.task_date, task.task_time * task.worker_number])
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
        let discount_money = 0
        let summa = 0
        data.tasks.forEach(element => {
            all_task_time += element.task_time 
            all_worker_number += element.worker_number
            summa += element.task_time * element.worker_number * data.bxm.summa
        });
        if(data.discount){
            discount_money = summa * (data.discount / 100)
            summa = summa - discount_money
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
                organization_id = $9, 
                account_number_id = $10,
                start_time = $11,
                end_time = $12,
                all_worker_number = $13,
                all_task_time = $14,
                remaining_balance = $16,
                discount_money = $17
                WHERE id = $15 AND isdeleted = false RETURNING *
        `, [
            data.doc_num,
            data.doc_date,
            data.period,
            data.adress,
            data.start_date,
            data.end_date,
            data.discount,
            summa,
            data.organization_id,
            data.account_number_id,
            data.start_time,
            data.end_time,
            all_worker_number, 
            all_task_time,
            data.id,
            summa,
            discount_money
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
                task(contract_id, batalon_id, task_time, worker_number, summa, user_id, task_date, remaining_task_time) 
                VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING * 
            `, [contract.id, task.batalon_id, task.task_time, task.worker_number, summa, data.user_id, task.task_date, task.task_time * task.worker_number])
            tasks.push(rows[0])
        }
        contract.tasks = tasks
        return contract
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const getcontractService = async (user_id, offset, limit, search, from, to) => {
    try {
        let serach_filter = ``;
        const params = [user_id, offset, limit, from, to];
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
                    TO_CHAR(c.doc_date, 'YYYY-MM-DD') AS doc_date, 
                    c.adress, 
                    o.name AS organization_name,
                    c.payment
                FROM contract  AS c 
                JOIN organization AS o ON o.id = c.organization_id
                WHERE c.isdeleted = false AND c.user_id = $1 ${serach_filter} AND c.doc_date BETWEEN $4 AND $5
                ORDER BY c.doc_date OFFSET $2 LIMIT $3
            )
            SELECT 
                ARRAY_AGG(row_to_json(data)) AS data,
                (SELECT COALESCE(COUNT(id), 0) FROM contract WHERE isdeleted = false AND user_id = $1 AND doc_date BETWEEN $4 AND $5)::INTEGER AS total_count,
                (SELECT COALESCE(SUM(summa), 0) FROM contract WHERE isdeleted = false AND user_id = $1 AND doc_date <= $4)::FLOAT AS from_balance,
                (SELECT COALESCE(SUM(summa), 0) FROM contract WHERE isdeleted = false AND user_id = $1 AND doc_date <= $5)::FLOAT AS to_balance
            FROM data
        `, params);
        return { data: rows[0]?.data || [], total: rows[0].total_count, from_balance: rows[0].from_balance, to_balance: rows[0].to_balance }
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
                TO_CHAR(c.doc_date, 'YYYY-MM-DD') AS doc_date, 
                TO_CHAR(c.period, 'YYYY-MM-DD') AS period, 
                c.adress, 
                TO_CHAR(c.start_date, 'YYYY-MM-DD') AS start_date, 
                TO_CHAR(c.end_date, 'YYYY-MM-DD') AS end_date, 
                c.discount, 
                c.summa::FLOAT, 
                c.payment, 
                c.organization_id, 
                c.account_number_id,
                c.start_time,
                c.end_time,
                c.all_worker_number,
                c.all_task_time,
                c.remaining_balance::FLOAT,
                (SELECT ARRAY_AGG(row_to_json(tasks))
                    FROM (
                    SELECT 
                        t.id,
                        t.batalon_id, 
                        t.task_time, 
                        t.worker_number,
                        t.summa, 
                        TO_CHAR(t.task_date, 'YYYY-MM-DD') AS task_date
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

const updateContractPaymentService = async (contract_id) => {
    try {
        const contract = await pool.query(
            `UPDATE contract SET payment = true WHERE id = $1  RETURNING *`,
            [contract_id]
        );
        return contract.rows[0];
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode);
    }
};

module.exports = {
    contractCreateService,
    getcontractService,
    getByIdcontractService,
    contractUpdateService,
    deletecontractService,
    updateContractPaymentService
}
