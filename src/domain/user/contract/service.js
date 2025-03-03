const { ContractDB } = require('@contract/db')
const { db } = require('@db/index');

exports.ContractService = class {
    static async create(data) {
        let all_worker_number = 0;
        let all_task_time = 0;
        let discount_money = 0;
        let summa = 0;
        let result_summa = 0;

        await

            await client.query('BEGIN');
        data.tasks.forEach(element => {
            all_task_time += element.task_time;
            all_worker_number += element.worker_number;
            summa += element.task_time * element.worker_number * element.bxm_summa;
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
                result_summa,
                dist
            ) 
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) RETURNING *
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
            result_summa,
            data.dist
        ]);
        const contract = rows[0];
        const taskPromises = data.tasks.map(task => {
            let task_discount_money = 0;
            let task_result_summa = 0;
            let task_summa = task.task_time * task.worker_number * task.bxm_summa;

            if (data.discount) {
                task_discount_money = task_summa * (data.discount / 100);
                task_result_summa = task_summa - task_discount_money;
            } else {
                task_result_summa = task_summa;
            }

            return client.query(`
                INSERT INTO 
                task(contract_id, batalon_id, task_time, worker_number, summa, user_id, task_date, discount_money, result_summa, bxm_id, time_money, address) 
                VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *
            `, [
                contract.id,
                task.batalon_id,
                task.task_time,
                task.worker_number,
                task_summa,
                data.user_id,
                task.task_date ? task.task_date : null,
                task_discount_money,
                task_result_summa,
                task.bxm_id,
                task.bxm_summa,
                task.address
            ]);
        });

        const tasksResults = await Promise.all(taskPromises);
        contract.tasks = tasksResults.map(result => result.rows[0]);
        await client.query('COMMIT');
        return contract;
    }
}