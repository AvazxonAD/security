const ErrorResponse = require('../utils/errorResponse')
const pool = require('../config/db')

const prixodCreateService = async (data) => {
    try {
        const prixod = await pool.query(`
            INSERT INTO prixod (
            user_id,
            organization_id,
            contract_id,
            opisanie,
            doc_num,
            doc_date,
            summa,
            account_number_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *  
            `, [
            data.user_id,
            data.organization_id,
            data.contract_id,
            data.opisanie,
            data.doc_num,
            data.doc_date,
            data.summa,
            data.account_number_id
        ])
        return prixod.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}


const getPrixodService = async (user_id, from, to, offset, limit, account_number_id, search, organization_id) => {
    try {
        const params = [user_id, from, to, account_number_id]
        let offset_limit = ``
        if(offset !== null && limit !== null){
            offset_limit = `OFFSET $${params.length + 1} LIMIT $${params.length + 2}`
            params.push(offset, limit)
        }
        const prixods = await pool.query(`
            WITH data AS (
                SELECT 
                    p.id, 
                    c.id AS contract_id,
                    c.doc_num AS contract_doc_num,
                    TO_CHAR(c.doc_date, 'YYYY-MM-DD') AS contract_doc_date, 
                    c.result_summa::FLOAT AS contract_summa, 
                    o.id AS organization_id,
                    o.name AS organization_name,
                    o.address AS organization_address,
                    o.str AS organization_str,
                    o.bank_name AS organization_bank_name,
                    o.mfo AS organization_mfo,
                    o.account_number AS organization_account_number,
                    o.treasury1 AS organization_treasury1,
                    o.treasury2 AS organization_treasury2,
                    p.summa::FLOAT AS prixod_summa, 
                    p.doc_num AS prixod_doc_num,
                    p.opisanie,
                    TO_CHAR(p.doc_date, 'YYYY-MM-DD') AS prixod_date
                FROM prixod AS p
                JOIN contract AS c ON c.id = p.contract_id 
                JOIN organization AS o ON c.organization_id = o.id 
                WHERE p.isdeleted = false AND p.user_id = $1 AND p.doc_date BETWEEN $2 AND $3 AND p.account_number_id = $4 
                ORDER BY p.doc_num DESC
                ${offset_limit}
            )
            SELECT 
                ARRAY_AGG(row_to_json(data)) AS data,
                (SELECT COALESCE(COUNT(id)::INTEGER, 0)
                    FROM prixod 
                    WHERE isdeleted = false AND user_id = $1 AND doc_date BETWEEN $2 AND $3 AND account_number_id = $4) AS total_count,
                (SELECT COALESCE(SUM(summa)::FLOAT, 0)
                    FROM prixod 
                    WHERE isdeleted = false AND user_id = $1 AND doc_date BETWEEN $2 AND $3 AND account_number_id = $4) AS summa,
                (SELECT COALESCE(SUM(summa)::FLOAT, 0)
                    FROM prixod 
                    WHERE isdeleted = false AND user_id = $1 AND doc_date <= $2 AND account_number_id = $4) AS from_balance ,
                (SELECT COALESCE(SUM(summa)::FLOAT, 0)
                    FROM prixod 
                    WHERE isdeleted = false AND user_id = $1 AND doc_date <= $3 AND account_number_id = $4) AS to_balance 
            FROM data
        `, params)
        const result = prixods.rows[0]
        return { data: result?.data || [], total: result.total_count, from_balance: result.from_balance, to_balance: result.to_balance, summa: result.summa }
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const getByIdPrixodService = async (user_id, id, account_number_id, isdeleted = false) => {
    try {
        let filter = ``
        if (!isdeleted) {
            filter = `AND p.isdeleted = false`
        }
        const data = await pool.query(`
            SELECT 
                p.id, 
                c.id AS contract_id,
                c.doc_num AS contract_doc_num,
                TO_CHAR(c.doc_date, 'YYYY-MM-DD') AS contract_doc_date, 
                c.result_summa::FLOAT AS contract_summa, 
                o.id AS organization_id,
                o.name AS organization_name,
                o.address AS organization_address,
                o.str AS organization_str,
                o.bank_name AS organization_bank_name,
                o.mfo AS organization_mfo,
                o.account_number AS organization_account_number,
                o.treasury1 AS organization_treasury1,
                o.treasury2 AS organization_treasury2,
                p.summa::FLOAT AS prixod_summa, 
                p.opisanie,
                TO_CHAR(p.doc_date, 'YYYY-MM-DD') AS prixod_date
            FROM prixod AS p 
            JOIN contract AS c ON c.id = p.contract_id 
            JOIN organization AS o ON c.organization_id = o.id 
            WHERE p.isdeleted = false AND p.user_id = $1 AND p.account_number_id = $3 AND p.id = $2 ${filter}
        `, [user_id, id, account_number_id])
        if(!data.rows[0]){
            throw new ErrorResponse('prixod not found', 404)
        }
        return data.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const updatePrixodService = async (data) => {
    try {
        const result = await pool.query(`
            UPDATE prixod SET 
                organization_id = $1,
                contract_id = $2,
                opisanie = $3,
                doc_num = $4,
                doc_date = $5,
                summa = $6
            WHERE id = $7 RETURNING * 
        `, [
            data.organization_id,
            data.contract_id,
            data.opisanie,
            data.doc_num,
            data.doc_date,
            data.summa,
            data.id
        ])
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const deletePrixodService = async (id) => {
    try {
        await pool.query(`UPDATE prixod SET isdeleted = true WHERE id = $1 AND isdeleted = false`, [id])
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

module.exports = {
    prixodCreateService,
    getPrixodService,
    getByIdPrixodService,
    updatePrixodService,
    deletePrixodService
}