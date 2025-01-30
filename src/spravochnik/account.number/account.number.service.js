const { query } = require('express')
const pool = require('../../config/db')
const ErrorResponse = require('../../utils/errorResponse')


const account_numberCreateService = async (account_number, user_id) => {
    try {
        const result = await pool.query(`INSERT INTO account_number(account_number, user_id) VALUES($1, $2) RETURNING *`, [account_number,  user_id])
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const account_numberUpdateService = async (account_number, id) => {
    try {
        const result = await pool.query(`UPDATE account_number SET account_number = $1 WHERE id = $2 AND isdeleted = false RETURNING *`, [account_number, id])
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const getaccount_numberService = async (user_id) => {
    try {
        const result = await pool.query(`SELECT id, account_number FROM account_number WHERE isdeleted = false AND user_id = $1`, [user_id])
        return result.rows
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const getByIdaccount_numberService = async (user_id, id, ignore_deleted = false) => {
    try {
        let ignore = ``
        if(!ignore_deleted){
            ignore = `isdeleted = false AND`
        }
        const result = await pool.query(`SELECT id, account_number FROM account_number WHERE ${ignore} user_id = $1 AND id = $2`, [user_id, id])
        if(!result.rows[0]){
            throw new ErrorResponse('account_number not found', 404)
        }
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const getByaccount_numberaccount_numberService = async (user_id, account_number) => {
    try {
        const result = await pool.query(`SELECT * FROM account_number WHERE isdeleted = false AND user_id = $1 AND account_number = $2`, [user_id, account_number])
        if(result.rows[0]){
            throw new ErrorResponse('This data has already been provided', 404)
        }
        return result.rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const deleteaccount_numberService = async (id) => {
    try {
        await pool.query(`UPDATE account_number SET isdeleted = true WHERE id = $1 AND isdeleted = false RETURNING *`, [id])
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

module.exports = {
    account_numberCreateService,
    getaccount_numberService,
    getByIdaccount_numberService,
    account_numberUpdateService,
    deleteaccount_numberService,
    getByaccount_numberaccount_numberService
}
