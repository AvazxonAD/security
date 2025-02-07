const { query } = require('express')
const pool = require('../config/db')
const ErrorResponse = require('../utils/errorResponse')


const organizationCreateService = async (data) => {
    try {
        const result = await pool.query(`INSERT INTO organization(name, address, str, bank_name, mfo, account_number, treasury1, treasury2, user_id) 
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *
        `, [
            data.name,
            data.address,
            data.str,
            data.bank_name,
            data.mfo,
            data.account_number,
            data.treasury1,
            data.treasury2,
            data.user_id
        ])
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const organizationUpdateService = async (data) => {
    try {
        const result = await pool.query(`UPDATE organization SET name = $1, address = $2, str = $3, bank_name = $4, mfo = $5, account_number = $6, treasury1 = $7, treasury2 = $8  
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

const getorganizationService = async (user_id, search, offset, limit) => {
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
                FROM organization  
                WHERE isdeleted = false AND user_id = $1 ${filter}
                ORDER BY id DESC, name OFFSET $2 LIMIT $3
            )
            SELECT 
                ARRAY_AGG(row_to_json(data)) AS data,
                COALESCE((SELECT COUNT(id) FROM organization WHERE isdeleted = false AND user_id = $1 ${filter}), 0)::INTEGER AS total_count
            FROM data
        `, params);
        return {data: rows[0]?.data || [], total: rows[0].total_count}
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode);
    }
}


const excelDataOrganizationService = async (user_id) => {
    try {
        const { rows } = await pool.query(`
            WITH data AS (
                SELECT name, address, str, bank_name, mfo, account_number, treasury1, treasury2
                FROM organization  
                WHERE isdeleted = false AND user_id = $1
                ORDER BY name
            )
            SELECT 
                ARRAY_AGG(row_to_json(data)) AS data,
                COALESCE((SELECT COUNT(id) FROM organization WHERE isdeleted = false AND user_id = $1), 0)::INTEGER AS total_count
            FROM data
        `, [user_id]);
        return {data: rows[0]?.data || [], total: rows[0].total_count}
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode);
    }
}


const getByIdorganizationService = async (user_id, id, isdeleted = false, lang) => {
    try {
        let filter = ``
        if (!isdeleted) {
            filter = `AND isdeleted = false`
        }
        const result = await pool.query(`
            SELECT id, name, address, str, bank_name, mfo, account_number, treasury1, treasury2
            FROM organization
            WHERE user_id = $1 AND id = $2 ${filter} 
        `, [user_id, id])
        if (!result.rows[0]) {
            throw new ErrorResponse(lang.t('organizationNotFound'), 404)
        }
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const deleteorganizationService = async (id) => {
    try {
        await pool.query(`UPDATE organization SET isdeleted = true WHERE id = $1 AND isdeleted = false`, [id])
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const getByStrOrganizationService = async (str, user_id, lang) => {
    try {
        const { rows } = await pool.query(`SELECT organization.* 
            FROM organization 
            WHERE str = $1 AND isdeleted = false AND user_id = $2
        `, [str, user_id])
        if (rows[0]) {
            throw new ErrorResponse(lang.t('organizationExists'), 409)
        }
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

module.exports = {
    organizationCreateService,
    getorganizationService,
    getByIdorganizationService,
    organizationUpdateService,
    deleteorganizationService,
    getByStrOrganizationService,
    excelDataOrganizationService
}
