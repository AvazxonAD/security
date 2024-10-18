const pool = require('../config/db')
const ErrorResponse = require('../utils/errorResponse')

const contractCreateService = async (data) => {
    try {
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
                end_time
            ) 
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *
        `, [
            data.doc_num,
            data.doc_date,
            data.period,
            data.adress,
            data.start_date,
            data.end_date,
            data.discount,
            data.summa,
            data.payment,
            data.payment_date,
            data.organization_id,
            data.account_number_id,
            data.user_id,
            data.start_time,
            data.end_time
        ])
        const contract = rows[0]
        const tasks = []
        for (let task of data.tasks) {
            const { rows } = await pool.query(`INSERT INTO task(contract_id, batalon_id, task_time, worker_number, summa) VALUES($1, $2, $3, $4, $5)
            `, [task.contract_id, task.batalon_id, task.task_time, task.worker_number, task.summa])
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
        const result = await pool.query(`UPDATE contract SET name = $1, address = $2, str = $3, bank_name = $4, mfo = $5, account_number = $6, treasury1 = $7, treasury2 = $8  
            WHERE id = $9 AND isdeleted = false RETURNING *
        `, [
            data.name,
            data.address,
            data.str,
            data.bank_name,
            data.mfo,
            data.account_number,
            data.treasury1,
            data.treasury2,
            data.id
        ])
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const getcontractService = async (user_id, search, offset, limit) => {
    try {
        let filter = ``;
        const params = [user_id, offset, limit];
        if (search) {
            filter = `AND (
                    str ILIKE  '%' || $${params.length + 1} || '%' 
                    OR account_number ILIKE  '%' || $${params.length + 1} || '%' 
                    OR name ILIKE  '%' || $${params.length + 1} || '%'
                    OR address ILIKE  '%' || $${params.length + 1} || '%'
                    OR treasury1 ILIKE  '%' || $${params.length + 1} || '%'
                    OR treasury2 ILIKE  '%' || $${params.length + 1} || '%'
                )
            `
            params.push(search)
        }
        const { rows } = await pool.query(`
            WITH data AS (
                SELECT id, name, address, str, bank_name, mfo, account_number, treasury1, treasury2
                FROM contract  
                WHERE isdeleted = false AND user_id = $1 ${filter}
                ORDER BY name OFFSET $2 LIMIT $3
            )
            SELECT 
                ARRAY_AGG(row_to_json(data)) AS data,
                COALESCE((SELECT COUNT(id) FROM contract WHERE isdeleted = false AND user_id = $1 ${filter}), 0)::INTEGER AS total_count
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
            filter = `AND isdeleted = false`
        }
        const result = await pool.query(`
            SELECT id, name, address, str, bank_name, mfo, account_number, treasury1, treasury2
            FROM contract
            WHERE user_id = $1 AND id = $2 ${filter} 
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
        await pool.query(`UPDATE contract SET isdeleted = true WHERE id = $1 AND isdeleted = false`, [id])
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const getByStrcontractService = async (str, user_id) => {
    try {
        const { rows } = await pool.query(`SELECT contract.* 
            FROM contract 
            WHERE str = $1 AND isdeleted = false AND user_id = $2
        `, [str, user_id])
        if (rows[0]) {
            throw new ErrorResponse('This str is already entered', 409)
        }
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
    getByStrcontractService
}
