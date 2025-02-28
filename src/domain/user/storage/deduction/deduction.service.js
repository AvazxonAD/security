const { query } = require('express')
const pool = require('../../config/db')
const ErrorResponse = require('../../utils/errorResponse')


const deductionCreateService = async (data) => {
    try {
        const result = await pool.query(`INSERT INTO deduction(name, percent, user_id) 
            VALUES($1, $2, $3) RETURNING *
        `, [
            data.name,
            data.percent,
            data.user_id
        ])
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const deductionUpdateService = async (data) => {
    try {
        const result = await pool.query(`UPDATE deduction SET name = $1, percent = $2 WHERE id = $3 AND isdeleted = false RETURNING *`, 
            [
            data.name,
            data.percent,
            data.id
        ])
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const getdeductionService = async (user_id, search, offset, limit) => {
    try {
        let filter = ``;
        const params = [user_id, offset, limit];
        if (search) {
            filter = `AND name '%' || $${params.length + 1} || '%'`
            params.push(search)
        }
        const { rows } = await pool.query(`
            WITH data AS (
                SELECT id, name, percent
                FROM deduction  
                WHERE isdeleted = false AND user_id = $1 ${filter}
                ORDER BY name OFFSET $2 LIMIT $3
            )
            SELECT 
                ARRAY_AGG(row_to_json(data)) AS data,
                COALESCE((SELECT COUNT(id) FROM deduction WHERE isdeleted = false AND user_id = $1 ${filter}), 0)::INTEGER AS total_count
            FROM data
        `, params);
        return {data: rows[0]?.data || [], total: rows[0].total_count}
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode);
    }
}

const getByIddeductionService = async (user_id, id, isdeleted = false, lang) => {
    try {
        let filter = ``
        if (!isdeleted) {
            filter = `AND isdeleted = false`
        }
        const result = await pool.query(`
            SELECT id, name, percent
            FROM deduction
            WHERE user_id = $1 AND id = $2 ${filter} 
        `, [user_id, id])
        if (!result.rows[0]) {
            throw new ErrorResponse(lang.t('docNotFound'), 404)
        }
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const deletedeductionService = async (id) => {
    try {
        await pool.query(`UPDATE deduction SET isdeleted = true WHERE id = $1 AND isdeleted = false`, [id])
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const getBynamedeductionService = async (name, user_id, lang) => {
    try {
        const { rows } = await pool.query(`SELECT * FROM deduction WHERE name = $1 AND isdeleted = false AND user_id = $2`, [name, user_id])
        if (rows[0]) {
            throw new ErrorResponse(lang.t('deductionExists'), 409)
        }
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

module.exports = {
    deductionCreateService,
    getdeductionService,
    getByIddeductionService,
    deductionUpdateService,
    deletedeductionService,
    getBynamedeductionService
}
