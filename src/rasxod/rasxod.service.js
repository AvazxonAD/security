const ErrorResponse = require('../utils/errorResponse')
const pool = require('../config/db')


const paymentRequestService = async (account_number, batalon_id, to) => {
    try {
        const result = await pool.query(`
            SELECT 
                c.doc_num,
                c.doc_date,
                o.name AS organization_name,
                t.task_time,
                t.worker_number,
                t.result_summa
            FROM task t
            JOIN contract AS c ON c.id = 
        `)
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

module.exports = {
    paymentRequestService
}