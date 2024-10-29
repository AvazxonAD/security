const { query } = require('express')
const pool = require('../config/db')
const ErrorResponse = require('../utils/errorResponse')


const batalonCreateService = async (name, birgada, user_id) => {
    try {
        const result = await pool.query(`INSERT INTO batalon(name, birgada, user_id) VALUES($1, $2, $3) RETURNING *`, [name, birgada, user_id])
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const batalonUpdateService = async (name, birgada, id) => {
    try {
        const result = await pool.query(`UPDATE batalon SET name = $1, birgada = $2 WHERE id = $3 AND isdeleted = false RETURNING *`, [name, birgada, id])
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const getBatalonService = async (user_id) => {
    try {
        const result = await pool.query(`SELECT id, name, birgada FROM batalon WHERE isdeleted = false AND user_id = $1`, [user_id])
        return result.rows
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const getByIdBatalonService = async (user_id, id) => {
    try {
        const result = await pool.query(`SELECT name, birgada FROM batalon WHERE isdeleted = false AND user_id = $1 AND id = $2`, [user_id, id])
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
        const result = await pool.query(`SELECT id, name, birgada FROM batalon WHERE isdeleted = false AND user_id = $1 AND name = $2`, [user_id, name])
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

module.exports = {
    batalonCreateService,
    getBatalonService,
    getByIdBatalonService,
    batalonUpdateService,
    deleteBatalonService,
    getByNameBatalonService
}
