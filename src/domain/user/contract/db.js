// const pool = require('../config/db')
// const ErrorResponse = require('../utils/errorResponse')

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
            summa += element.task_time * element.worker_number * element.bxm_summa;
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
                result_summa = $15,
                dist = $16
            WHERE id = $17 AND isdeleted = false RETURNING *
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
            data.dist,
            data.id
        ]);
        const contract = rows[0];
        await client.query(`UPDATE task SET isdeleted = true WHERE contract_id = $1`, [data.id]);
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

const checkRaxodContract = async (contract_id) => {
    const query = `--sql
        SELECT t.contract_id, d.rasxod_fio_doc_id AS d 
        FROM rasxod_fio d
        JOIN worker_task AS w_t ON w_t.id = d.worker_task_id 
        JOIN task AS t ON t.id = w_t.task_id
        WHERE t.contract_id = $1 AND d.isdeleted = false 
        UNION ALL 
        SELECT t.contract_id,  d.rasxod_doc_id AS d 
        FROM rasxod d
        JOIN task AS t ON t.id = d.task_id
        WHERE t.contract_id = $1 AND d.isdeleted = false
    `;
    const result = await pool.query(query, [contract_id]);
    return result.rows[0];
}

const getcontractService = async (user_id, offset, limit, search, from, to, account_number_id, organization_id = null, batalion_id = null) => {
    try {
        let organization_filter = ``
        let serach_filter = ``;
        let batalion_filter = ``
        const params = [user_id, offset, limit, from, to, account_number_id];
        if (search) {
            serach_filter = `AND (
                    c.doc_num = $${params.length + 1} 
                    OR o.name ILIKE  '%' || $${params.length + 1} || '%'
                )
            `
            params.push(search)
        }
        if (organization_id) {
            organization_filter = `AND c.organization_id = $${params.length + 1}`
            params.push(organization_id)
        }
        if (batalion_id) {
            batalion_filter = `AND EXISTS (SELECT * FROM task AS t WHERE t.isdeleted = false AND t.batalon_id = $${params.length + 1} AND c.id = t.contract_id )`
            params.push(batalion_id)
        }
        const query = `
            WITH data AS (
                SELECT 
                    c.id,
                    c.doc_num, 
                    TO_CHAR(c.doc_date, 'YYYY-MM-DD') AS doc_date, 
                    c.result_summa,
                    c.adress, 
                    c.dist,
                    o.id AS organization_id,
                    o.name AS organization_name,
                    o.address AS organization_address,
                    o.str AS organization_str,
                    o.bank_name AS organization_bank_name,
                    o.mfo AS organization_mfo,
                    o.account_number AS organization_account_number,
                    o.treasury1 AS organization_treasury1,
                    o.treasury2 AS organization_treasury2,
                    ( SELECT (c.result_summa - COALESCE(SUM(summa), 0))::FLOAT FROM prixod WHERE isdeleted = false AND contract_id = c.id) AS remaining_balance,
                    (
                        (
                            COALESCE((SELECT SUM(summa) FROM prixod WHERE isdeleted = false AND contract_id = c.id),0)
                        ) - 
                        (
                            (
                                SELECT COALESCE(SUM(t.result_summa), 0) 
                                FROM rasxod AS r
                                JOIN task AS t ON t.id = r.task_id
                                JOIN contract AS c_inner ON t.contract_id = c_inner.id 
                                WHERE c_inner.id = c.id AND r.isdeleted = false
                            ) + 
                            (
                                SELECT COALESCE(SUM(r_fio.summa), 0) 
                                FROM rasxod_fio AS r_fio 
                                JOIN worker_task AS w_t ON w_t.id = r_fio.worker_task_id
                                JOIN task AS t ON t.id = w_t.task_id 
                                JOIN contract AS c_inner ON c_inner.id = t.contract_id
                                WHERE c_inner.id = c.id AND r_fio.isdeleted = false
                            )   
                        )
                    )::FLOAT AS remaining_summa
                FROM contract  AS c 
                JOIN organization AS o ON o.id = c.organization_id
                WHERE c.isdeleted = false 
                    AND c.user_id = $1 
                    ${serach_filter} ${organization_filter} ${batalion_filter}
                    AND c.doc_date BETWEEN $4 AND $5 
                    AND c.account_number_id = $6
                ORDER BY CAST(c.doc_num AS FLOAT)
                OFFSET $2 LIMIT $3
            )
            SELECT 
                ARRAY_AGG(row_to_json(data)) AS data,
                (
                    SELECT COALESCE(COUNT(c.id), 0) 
                    FROM contract AS c 
                    JOIN organization AS o ON o.id = c.organization_id 
                    WHERE c.isdeleted = false 
                        AND c.user_id = $1 
                        AND c.doc_date BETWEEN $4 AND $5 
                        AND c.account_number_id = $6 
                        ${serach_filter} 
                        ${organization_filter} 
                        ${batalion_filter}
                )::INTEGER AS total_count,
                (
                    SELECT COALESCE(SUM(c.result_summa), 0) 
                    FROM contract AS c 
                    JOIN organization AS o ON o.id = c.organization_id 
                    WHERE c.isdeleted = false 
                        AND c.user_id = $1 
                        AND c.doc_date <= $4 
                        AND c.account_number_id = $6 
                        ${serach_filter} 
                        ${organization_filter} 
                        ${batalion_filter}
                )::FLOAT AS from_balance,
                (
                    SELECT COALESCE(SUM(c.result_summa), 0) 
                    FROM contract AS c 
                    LEFT JOIN organization AS o ON o.id = c.organization_id 
                    WHERE c.isdeleted = false 
                        AND c.user_id = $1 
                        AND c.doc_date <= $5 
                        AND c.account_number_id = $6 
                        ${serach_filter} 
                        ${organization_filter} 
                        ${batalion_filter}
                )::FLOAT AS to_balance
            FROM data
        `;

        const { rows } = await pool.query(query, params);
        
        return { data: rows[0]?.data || [], total: rows[0].total_count, from_balance: rows[0].from_balance, to_balance: rows[0].to_balance }
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode);
    }
};

const getByIdcontractService = async (user_id, id, isdeleted = false, account_number_id, organization_id = null, lang) => {
    try {
        const params = [user_id, id, account_number_id]
        let organization = ``
        let filter = ``
        let filter_task = ``
        if (!isdeleted) {
            filter = `AND c.isdeleted = false`
            filter_task = ` AND t.isdeleted = false`
        }
        if (organization_id) {
            organization = ` AND c.organization_id = $${params.length + 1}`
            params.push(organization_id)
        }
        const result = await pool.query(`--sql
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
                c.dist,
                ( SELECT (c.result_summa - COALESCE(SUM(summa), 0))::FLOAT FROM prixod WHERE isdeleted = false AND contract_id = $2) AS remaining_balance,
                (SELECT ARRAY_AGG(row_to_json(tasks))
                    FROM (
                    SELECT 
                        t.id,
                        t.batalon_id, 
                        t.task_time, 
                        t.worker_number,
                        t.summa, 
                        t.time_money AS timemoney, 
                        t.discount_money,
                        t.result_summa,
                        TO_CHAR(t.task_date, 'YYYY-MM-DD') AS task_date,
                        b.name AS batalon_name,
                        t.address,
                        (   
                            (t.task_time * t.worker_number) - (
                                SELECT COALESCE(SUM(task_time), 0)
                                FROM worker_task 
                                WHERE task_id = t.id AND isdeleted = false
                            ) 
                        ) AS remaining_task_time,
                        t.bxm_id
                    FROM task AS t
                    JOIN batalon AS b ON b.id = t.batalon_id
                    WHERE  t.user_id = $1 ${filter_task} AND t.contract_id = c.id AND t.isdeleted = false
                    ORDER BY task_date
                    ) AS tasks
                ) AS tasks 
            FROM contract  AS c 
            JOIN organization AS o ON o.id = c.organization_id
            WHERE c.user_id = $1 ${filter} AND c.id = $2 AND c.account_number_id = $3 ${organization} 
        `, params)
        if (!result.rows[0]) {
            throw new ErrorResponse(lang.t('contractNotFound'), 404)
        }
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
};

const dataForExcelService = async (user_id, account_number_id, from, to) => {
    try {
        const data = await pool.query(`--sql
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
                    ( SELECT COALESCE(SUM(summa), 0)::FLOAT FROM prixod WHERE isdeleted = false AND contract_id = c.id) AS debit,
                    (
                        (
                            COALESCE((SELECT SUM(summa) FROM prixod WHERE isdeleted = false AND contract_id = c.id),0)
                        ) - 
                        (
                            (
                                SELECT COALESCE(SUM(t.result_summa), 0) 
                                FROM rasxod AS r
                                JOIN task AS t ON t.id = r.task_id
                                JOIN contract AS c_inner ON t.contract_id = c_inner.id 
                                WHERE c_inner.id = c.id AND r.isdeleted = false
                            ) + 
                            (
                                SELECT COALESCE(SUM(r_fio.summa), 0) 
                                FROM rasxod_fio AS r_fio 
                                JOIN worker_task AS w_t ON w_t.id = r_fio.worker_task_id
                                JOIN task AS t ON t.id = w_t.task_id 
                                JOIN contract AS c_inner ON c_inner.id = t.contract_id
                                WHERE c_inner.id = c.id AND r_fio.isdeleted = false
                            )   
                        )
                    )::FLOAT AS remaining_summa
                FROM contract c   
                JOIN organization AS o ON o.id = c.organization_id
                JOIN account_number AS a_n ON a_n.id = c.account_number_id
                WHERE c.user_id = $1 AND c.isdeleted = false AND c.account_number_id = $2  AND c.doc_date BETWEEN $3 AND $4
                ORDER BY CAST(c.doc_num AS FLOAT)
            )
            SELECT 
                ARRAY_AGG(row_to_json(data)) AS data,
                (SELECT COALESCE(COUNT(id), 0) FROM contract WHERE user_id = $1 AND isdeleted = false AND account_number_id = $2  AND doc_date BETWEEN $3 AND $4 )::FLOAT AS total_count 
            FROM data  
        `, [user_id, account_number_id, from, to])
        return { data: data.rows[0]?.data || [], total: data.rows[0].total_count }
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const deleteContractService = async (id) => {
    try {
        await pool.query(`UPDATE task SET isdeleted = true WHERE contract_id = $1 AND isdeleted = false`, [id])
        await pool.query(`UPDATE contract SET isdeleted = true WHERE id = $1 AND isdeleted = false`, [id])
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const contractViewService = async (user_id, account_number_id, id) => {
    try {
        const data = await pool.query(`--sql
            SELECT 
                c.id,
                c.doc_num, 
                TO_CHAR(c.doc_date, 'YYYY-MM-DD') AS doc_date,  
                c.discount, 
                c.discount_money::FLOAT, 
                c.summa::FLOAT, 
                c.result_summa::FLOAT, 
                c.all_worker_number,
                c.all_task_time,
                c.organization_id, 
                o.name AS organization_name,
                o.str AS organization_str,
                o.account_number AS organization_account_number,  
                o.bank_name AS organization_bank_name,
                o.mfo AS organization_mfo,
                d.doer,
                str.str,
                a_c.account_number,
                b_k.bank,
                b_k.mfo,
                ( SELECT (c.result_summa - COALESCE(SUM(summa), 0))::FLOAT FROM prixod WHERE isdeleted = false AND contract_id = c.id) AS kridit,
                ( SELECT COALESCE(SUM(summa), 0)::FLOAT FROM prixod WHERE isdeleted = false AND contract_id = c.id) AS debit,
                (
                    (
                        COALESCE((SELECT SUM(summa) FROM prixod WHERE isdeleted = false AND contract_id = $3),0)
                    ) - 
                    (
                        (
                            SELECT COALESCE(SUM(t.result_summa), 0) 
                            FROM rasxod AS r
                            JOIN task AS t ON t.id = r.task_id
                            JOIN contract AS c_inner ON t.contract_id = c_inner.id 
                            WHERE c_inner.id = $3 AND r.isdeleted = false
                        ) + 
                        (
                            SELECT COALESCE(SUM(r_fio.summa), 0) 
                            FROM rasxod_fio AS r_fio 
                            JOIN worker_task AS w_t ON w_t.id = r_fio.worker_task_id
                            JOIN task AS t ON t.id = w_t.task_id 
                            JOIN contract AS c_inner ON c_inner.id = t.contract_id
                            WHERE c_inner.id = $3 AND r_fio.isdeleted = false
                        )
                    )
                )::FLOAT AS remaining_summa
            FROM contract c   
            JOIN organization AS o ON o.id = c.organization_id
            JOIN account_number AS a_c ON a_c.user_id = $1
            JOIN str ON str.user_id = $1 
            JOIN doer AS d ON d.user_id = $1
            JOIN bank AS b_k ON b_k.user_id = $1
            WHERE c.user_id = $1 AND c.isdeleted = false AND c.account_number_id = $2  AND c.id = $3
        `, [user_id, account_number_id, id])
        const prixods = await pool.query(`--sql
            SELECT 
                p.id, 
                p.doc_num AS prixod_doc_num,
                TO_CHAR(p.doc_date, 'YYYY-MM-DD') AS prixod_date,
                p.summa::FLOAT AS prixod_summa, 
                o.name AS organization_name,
                o.str AS organization_str,
                o.account_number AS organization_account_number
            FROM prixod AS p 
            JOIN organization AS o ON o.id = p.organization_id 
            WHERE p.isdeleted = false AND p.contract_id = $1
        `, [id])
        const rasxods = await pool.query(`--sql
            SELECT 
                r_d.id, 
                r_d.doc_num, 
                TO_CHAR(r_d.doc_date, 'YYYY-MM-DD') AS rasxod_date, 
                t.result_summa, 
                b.name AS batalon_account_number,
                b.str AS batalon_str,
                b.account_number AS batalon_name
            FROM  rasxod AS r 
            JOIN  task AS t ON t.id = r.task_id  
            JOIN contract AS c ON c.id = t.contract_id
            JOIN  batalon AS b ON b.id = t.batalon_id
            JOIN rasxod_doc AS r_d ON r_d.id = r.rasxod_doc_id 
            WHERE t.contract_id = $1 AND r.isdeleted = false
        `, [id])
        const rasxod_fio = await pool.query(`--sql
            SELECT 
                r_d.id,
                r_d.doc_num,
                TO_CHAR(r_d.doc_date, 'YYYY-MM-DD') AS rasxod_date,
                COALESCE(SUM(r_f.summa), 0)::FLOAT AS summa, 
                b.name AS batalon_name,
                b.str AS batalon_str,
                b.account_number AS batalon_account_number
            FROM rasxod_fio_doc AS r_d
            JOIN rasxod_fio AS r_f ON r_d.id = r_f.rasxod_fio_doc_id
            JOIN worker_task AS w_t ON w_t.id = r_f.worker_task_id
            JOIN task AS t ON t.id = w_t.task_id 
            JOIN batalon AS b ON b.id = t.batalon_id
            WHERE  t.contract_id = $1
            GROUP BY r_d.id, r_d.doc_num, rasxod_date, b.name, b.str, b.account_number 
        `, [id])
        return { contract: data.rows[0], prixods: prixods.rows, rasxods: rasxods.rows, rasxod_fios: rasxod_fio.rows }
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}



module.exports = {
    contractCreateService,
    getcontractService,
    getByIdcontractService,
    contractUpdateService,
    deleteContractService,
    dataForExcelService,
    contractViewService,
    checkRaxodContract
}
