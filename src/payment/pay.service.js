const ErrorResponse = require('../utils/errorResponse')
const pool = require('../config/db')

const paymentContractService = async (user_id, contract_id, summa, date) => {
    try {
        await pool.query(` INSERT INTO payment(user_id, contract_id, summa, date) VALUES($1, $2, $3, $4) RETURNING * `, [user_id, contract_id, summa, date])
        await pool.query(`UPDATE contract SET remaining_balance = (remaining_balance - $1) WHERE id = $2`, [summa, contract_id])
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
} 

const getPaymentService = async (user_id, from, to, offset, limit, search) => {
    try {
        const payments = await pool.query(`
            WITH data AS (
                SELECT p.id, c.doc_num, o.name, p.summa, TO_CHAR(p.date, 'YYYY-MM-DD') AS date
                FROM payment AS p 
                JOIN contract AS c ON c.id = p.contract_id 
                JOIN organization AS o ON c.organization_id = o.id 
                WHERE p.isdeleted = false AND p.user_id = $1 AND p.date BETWEEN $2 AND $3
                OFFSET $4 LIMIT $5
            )
            SELECT 
                ARRAY_AGG(row_to_json(data)) AS data,
                (SELECT COALESCE(COUNT(id), 0)
                    FROM payment 
                    WHERE isdeleted = false AND user_id = $1 AND date BETWEEN $2 AND $3)::INTEGER AS total_count,
                (SELECT COALESCE(SUM(summa), 0)
                    FROM payment 
                    WHERE isdeleted = false AND user_id = $1 AND date <= $2)::FLOAT AS from_balance ,
                (SELECT COALESCE(SUM(summa), 0)
                    FROM payment 
                    WHERE isdeleted = false AND user_id = $1 AND date <= $3)::FLOAT AS to_balance 
            FROM data
        `, [user_id, from, to, offset, limit])
        const result = payments.rows[0]
        return { data: result?.data || [], total: result.total_count, from_balance: result.from_balance, to_balance: result.to_balance}
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const getByIdPayService = async (user_id, id) => {
    try {
        const data = await pool.query(`
            SELECT c.doc_num, o.name, p.summa, TO_CHAR(p.date, 'YYYY-MM-DD') AS date
                FROM payment AS p 
                JOIN contract AS c ON c.id = p.contract_id 
                JOIN organization AS o ON c.organization_id = o.id 
                WHERE p.isdeleted = false AND p.user_id = $1 AND p.id = $2 
        `, [user_id, id])
        return data.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const  updatePaymentService = async (id, contract_id, summa, date, oldData) => {
    try {
        await pool.query(`UPDATE contract SET remaining_balance = (remaining_balance + $1) WHERE id = $2`, [oldData.summa, oldData.contract_id])
        await pool.query(` UPDATE paymen SET contract_id = $1, summa = $2 , date = $3 WHERE id = $4 RETURNING * `, [contract_id, summa, date, id])
        await pool.query(`UPDATE contract SET remaining_balance = (remaining_balance - $1) WHERE id = $2`, [summa, contract_id])
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
} 

module.exports = {
    paymentContractService,
    getPaymentService,
    getByIdPayService
}