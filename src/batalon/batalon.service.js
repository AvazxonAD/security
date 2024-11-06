const { query } = require('express')
const pool = require('../config/db')
const ErrorResponse = require('../utils/errorResponse')


const batalonCreateService = async (data) => {
    try {
        const result = await pool.query(`INSERT INTO batalon
            (
                name, 
                birgada, 
                user_id, 
                adress, 
                str, 
                bank_name, 
                mfo, 
                account_number,
                treasury1,
                treasury2 
            ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`, [
                data.name, 
                data.birgada, 
                data.user_id,
                data.adress, 
                data.str, 
                data.bank_name, 
                data.mfo, 
                data.account_number,
                data.treasury1,
                data.treasury2 
            ])
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const batalonUpdateService = async (data) => {
    try {
        const result = await pool.query(`UPDATE batalon SET 
            name = $1, 
            birgada = $2,
            adress = $3, 
            str = $4, 
            bank_name = $5, 
            mfo = $6, 
            account_number = $7,
            treasury1 = $8,
            treasury2 = $9  
            WHERE id = $3 AND isdeleted = false RETURNING *
        `, [
            data.name, 
            data.birgada, 
            data.id,
            data.adress, 
            data.str, 
            data.bank_name, 
            data.mfo, 
            data.account_number,
            data.treasury1,
            data.treasury2 
        ])
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const getBatalonService = async (user_id) => {
    try {
        const result = await pool.query(`SELECT id, name, adress, str, bank_name, mfo, account_number,treasury1, treasury2, birgada 
            FROM batalon WHERE isdeleted = false AND user_id = $1
        `, [user_id])
        return result.rows
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const getByIdBatalonService = async (user_id, id) => {
    try {
        const result = await pool.query(`SELECT id, name, adress, str, bank_name, mfo, account_number,treasury1, treasury2, birgada
            FROM batalon WHERE isdeleted = false AND user_id = $1 AND id = $2
        `, [user_id, id])
        if(!result.rows[0]){
            throw new ErrorResponse('batalon not found', 404)
        }
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const getByNameBatalonService = async (user_id, name, check = true) => {
    try {
        const result = await pool.query(`SELECT id, name, adress, str, bank_name, mfo, account_number,treasury1, treasury2, birgada
            FROM batalon WHERE isdeleted = false AND user_id = $1 AND name = $2
        `, [user_id, name])
        if(check){
            if(result.rows[0]){
                throw new ErrorResponse('This data has already been provided', 409)
            }
        }else {
            if(!result.rows[0]){
                throw new ErrorResponse('batalon not found', 404)
            }
        }
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const deleteBatalonService = async (id) => {
    try {
        const result = await pool.query(`UPDATE batalon SET isdeleted = true WHERE id = $1 AND isdeleted = false RETURNING *`, [id])
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const getOnlyBatalon = async (user_id) => {
    try {
        const result = await pool.query(`SELECT id, name FROM batalon WHERE isdeleted = false AND user_id = $1 AND birgada = false`, [user_id])
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}


module.exports = {
    batalonCreateService,
    getBatalonService,
    getByIdBatalonService,
    batalonUpdateService,
    deleteBatalonService,
    getByNameBatalonService
}
