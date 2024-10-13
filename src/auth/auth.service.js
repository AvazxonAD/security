const pool = require('../config/db')
const ErrorResponse = require('../utils/errorResponse')

// get By Login User Service
const getByLoginUserService = async (login) => {
    try {
        const { rows } = await pool.query(`SELECT id, password, login FROM users WHERE login = $1 AND isdeleted = false`, [login])
        const user = rows[0]
        if (!user) {
            throw new ErrorResponse('Incorrect username or password', 403)
        }
        return user
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

// get by id user  
const getBYIdUserService = async (user_id) => {
    try {
        const { rows } = await pool.query(`SELECT id, password, login FROM users WHERE id = $1 AND isdeleted = false`, [user_id])
        const user = rows[0]
        if (!user) {
            throw new ErrorResponse('user not found', 404)
        }
        return user
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const updateAuthService = async (login, password, id) => {
    try {
        const { rows } = await pool.query(`UPDATE users SET login = $1, password = $2 WHERE id = $3 RETURNING id, login`,
            [login, password, id],
        );
        return rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

module.exports = {
    getByLoginUserService,
    getBYIdUserService,
    updateAuthService
}