const pool = require('../config/db')
const ErrorResponse = require('../utils/errorResponse')

const contractCreateService = async (data) => {
    const client = await pool.connect();
    try {
        let all_worker_number = 0;
        let all_task_time = 0;
        let discount_money = 0;
        let summa = 0;
        let result_summa = 0;
        await client.query('BEGIN');
        data.tasks.forEach(element => {
            all_task_time += element.task_time;
            all_worker_number += element.worker_number;
            summa += element.task_time * element.worker_number * data.bxm.summa;
        });

        if (data.discount) {
            discount_money = summa * (data.discount / 100);
            result_summa = summa - discount_money;
        } else {
            result_summa = summa;
        }
        const { rows } = await client.query(`
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
                discount_money,
                result_summa
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
            discount_money,
            result_summa
        ]);
        const contract = rows[0];
        const taskPromises = data.tasks.map(task => {
            let task_discount_money = 0;
            let task_result_summa = 0;
            let task_summa = task.task_time * task.worker_number * data.bxm.summa;

            if (data.discount) {
                task_discount_money = task_summa * (data.discount / 100);
                task_result_summa = task_summa - task_discount_money;
            } else {
                task_result_summa = task_summa;
            }

            return client.query(`
                INSERT INTO 
                task(contract_id, batalon_id, task_time, worker_number, summa, user_id, task_date, discount_money, result_summa) 
                VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
            `, [
                contract.id, 
                task.batalon_id, 
                task.task_time, 
                task.worker_number, 
                task_summa, 
                data.user_id, 
                task.task_date, 
                task_discount_money, 
                task_result_summa
            ]);
        });

        const tasksResults = await Promise.all(taskPromises);
        contract.tasks = tasksResults.map(result => result.rows[0]);
        await client.query('COMMIT');
        return contract;
    } catch (error) {
        await client.query('ROLLBACK');
        throw new ErrorResponse(error.message || 'Error creating contract', error.statusCode || 500);
    } finally {
        client.release();
    }
};

const contractUpdateService = async (data) => {
    const client = await pool.connect();
    try {
        let all_worker_number = 0;
        let all_task_time = 0;
        let discount_money = 0;
        let summa = 0;
        let result_summa = 0;
        await client.query('BEGIN'); 
        data.tasks.forEach(element => {
            all_task_time += element.task_time;
            all_worker_number += element.worker_number;
            summa += element.task_time * element.worker_number * data.bxm.summa;
        });
        if (data.discount) {
            discount_money = summa * (data.discount / 100);
            result_summa = summa - discount_money;
        } else {
            result_summa = summa;
        }
        const { rows } = await client.query(`
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
                start_time = $10,
                end_time = $11,
                all_worker_number = $12,
                all_task_time = $13,
                discount_money = $14,
                result_summa = $15
            WHERE id = $16 AND isdeleted = false RETURNING *
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
            data.start_time,
            data.end_time,
            all_worker_number,
            all_task_time,
            discount_money,
            result_summa,
            data.id
        ]);
        const contract = rows[0];
        await client.query(`DELETE FROM task WHERE contract_id = $1`, [data.id]);
        const taskPromises = data.tasks.map(task => {
            let task_discount_money = 0;
            let task_result_summa = 0;
            let task_summa = task.task_time * task.worker_number * data.bxm.summa;

            if (data.discount) {
                task_discount_money = task_summa * (data.discount / 100);
                task_result_summa = task_summa - task_discount_money;
            } else {
                task_result_summa = task_summa;
            }

            return client.query(`
                INSERT INTO task(
                    contract_id, batalon_id, task_time, worker_number, 
                    summa, user_id, task_date, discount_money, result_summa
                ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
            `, [
                contract.id, 
                task.batalon_id, 
                task.task_time, 
                task.worker_number, 
                task_summa, 
                data.user_id, 
                task.task_date, 
                task_discount_money, 
                task_result_summa
            ]);
        });
        const tasks = await Promise.all(taskPromises);
        contract.tasks = tasks.map(task => task.rows[0]);
        await client.query('COMMIT'); 
        return contract;
    } catch (error) {
        await client.query('ROLLBACK'); 
        throw new ErrorResponse(error.message || 'Error updating contract', error.statusCode || 500);
    } finally {
        client.release(); 
    }
};

const getcontractService = async (user_id, offset, limit, search, from, to, account_number_id, organization_id = null) => {
    try {
        let organization_filter = ``
        let serach_filter = ``;
        const params = [user_id, offset, limit, from, to, account_number_id];
        if (search) {
            serach_filter = `AND (
                    c.doc_num ILIKE  '%' || $${params.length + 1} || '%' 
                    OR o.str ILIKE  '%' || $${params.length + 1} || '%'
                    OR o.name ILIKE  '%' || $${params.length + 1} || '%'
                    OR o.account_number ILIKE  '%' || $${params.length + 1} || '%'
                )
            `
            params.push(search)
        }
        if(organization_id){
            organization_filter = `AND c.organization_id = $${params.length + 1}`
            params.push(organization_id)
        }
        const { rows } = await pool.query(`
            WITH data AS (
                SELECT 
                    c.id,
                    c.doc_num, 
                    TO_CHAR(c.doc_date, 'YYYY-MM-DD') AS doc_date, 
                    c.result_summa,
                    c.adress, 
                    o.id AS organization_id,
                    o.name AS organization_name,
                    o.address AS organization_address,
                    o.str AS organization_str,
                    o.bank_name AS organization_bank_name,
                    o.mfo AS organization_mfo,
                    o.account_number AS organization_account_number,
                    o.treasury1 AS organization_treasury1,
                    o.treasury2 AS organization_treasury2,
                    ( SELECT (c.result_summa - COALESCE(SUM(summa), 0))::FLOAT FROM prixod WHERE isdeleted = false AND contract_id = c.id) AS remaining_balance
                FROM contract  AS c 
                JOIN organization AS o ON o.id = c.organization_id
                WHERE c.isdeleted = false AND c.user_id = $1 ${serach_filter} ${organization_filter} AND c.doc_date BETWEEN $4 AND $5 AND c.account_number_id = $6
                ORDER BY c.doc_date OFFSET $2 LIMIT $3
            )
            SELECT 
                ARRAY_AGG(row_to_json(data)) AS data,
                (SELECT COALESCE(COUNT(c.id), 0) FROM contract AS c JOIN organization AS o ON o.id = c.organization_id WHERE c.isdeleted = false AND c.user_id = $1 AND c.doc_date BETWEEN $4 AND $5 AND c.account_number_id = $6 ${serach_filter} ${organization_filter})::INTEGER AS total_count,
                (SELECT COALESCE(SUM(c.result_summa), 0) FROM contract AS c JOIN organization AS o ON o.id = c.organization_id WHERE c.isdeleted = false AND c.user_id = $1 AND c.doc_date <= $4 AND c.account_number_id = $6 ${serach_filter} ${organization_filter})::FLOAT AS from_balance,
                (SELECT COALESCE(SUM(c.result_summa), 0) FROM contract AS c JOIN organization AS o ON o.id = c.organization_id WHERE c.isdeleted = false AND c.user_id = $1 AND c.doc_date <= $5 AND c.account_number_id = $6 ${serach_filter} ${organization_filter})::FLOAT AS to_balance
            FROM data
        `, params);
        return { data: rows[0]?.data || [], total: rows[0].total_count, from_balance: rows[0].from_balance, to_balance: rows[0].to_balance }
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode);
    }
};

const getByIdcontractService = async (user_id, id, isdeleted = false, account_number_id, organization_id = null) => {
    try {
        const params = [user_id, id, account_number_id]
        let organization = ``
        let filter = ``
        if (!isdeleted) {
            filter = `AND c.isdeleted = false`
        }
        if(organization_id){
            organization = ` AND c.organization_id = $${params.length + 1}`
            params.push(organization_id)
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
                c.discount_money::FLOAT, 
                c.summa::FLOAT, 
                c.result_summa::FLOAT, 
                c.organization_id, 
                c.account_number_id,
                c.start_time,
                c.end_time,
                c.all_worker_number,
                c.all_task_time,
                ( SELECT (c.result_summa - COALESCE(SUM(summa), 0))::FLOAT FROM prixod WHERE isdeleted = false AND contract_id = $2) AS remaining_balance,
                (SELECT ARRAY_AGG(row_to_json(tasks))
                    FROM (
                    SELECT 
                        t.id,
                        t.batalon_id, 
                        t.task_time, 
                        t.worker_number,
                        t.summa, 
                        t.discount_money,
                        t.result_summa,
                        TO_CHAR(t.task_date, 'YYYY-MM-DD') AS task_date,
                        b.name AS batalon_name
                    FROM task AS t
                    JOIN batalon AS b ON b.id = t.batalon_id
                    WHERE  t.user_id = $1 AND t.isdeleted = false AND t.contract_id = c.id 
                    ) AS tasks
                ) AS tasks 
            FROM contract  AS c 
            JOIN organization AS o ON o.id = c.organization_id
            WHERE c.user_id = $1 ${filter} AND c.id = $2 AND c.account_number_id = $3 ${organization} 
        `, params)
        if (!result.rows[0]) {
            throw new ErrorResponse('contract not found', 404)
        }
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const dataForExcelService = async (user_id, account_number_id, from, to) => {
    try {
        const data = await pool.query(`
            WITH data AS (
                SELECT 
                    c.id,
                    c.doc_num, 
                    o.name AS organization_name,
                    TO_CHAR(c.doc_date, 'YYYY-MM-DD') AS doc_date, 
                    TO_CHAR(c.period, 'YYYY-MM-DD') AS period, 
                    c.adress, 
                    TO_CHAR(c.start_date, 'YYYY-MM-DD') AS start_date, 
                    TO_CHAR(c.end_date, 'YYYY-MM-DD') AS end_date, 
                    c.discount, 
                    c.discount_money::FLOAT, 
                    c.summa::FLOAT, 
                    c.result_summa::FLOAT, 
                    c.organization_id, 
                    c.account_number_id,
                    a_n.account_number,
                    c.start_time,
                    c.end_time,
                    c.all_worker_number,
                    c.all_task_time,
                    ( SELECT (c.result_summa - COALESCE(SUM(summa), 0))::FLOAT FROM prixod WHERE isdeleted = false AND contract_id = c.id) AS kridit,
                    ( SELECT COALESCE(SUM(summa), 0)::FLOAT FROM prixod WHERE isdeleted = false AND contract_id = c.id) AS debit
                FROM contract c   
                JOIN organization AS o ON o.id = c.organization_id
                JOIN account_number AS a_n ON a_n.id = c.account_number_id
                WHERE c.user_id = $1 AND c.isdeleted = false AND c.account_number_id = $2  AND c.doc_date BETWEEN $3 AND $4
            )
            SELECT 
                ARRAY_AGG(row_to_json(data)) AS data,
                (SELECT COALESCE(COUNT(id), 0) FROM contract WHERE user_id = $1 AND isdeleted = false AND account_number_id = $2  AND doc_date BETWEEN $3 AND $4 )::FLOAT AS total_count 
            FROM data  
        `, [user_id, account_number_id, from, to])
        return {data: data.rows[0]?.data || [], total: data.rows[0].total_count}
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
    deletecontractService,
    dataForExcelService
}
