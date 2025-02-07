const pool = require('../config/db')
const ErrorResponse = require('../utils/errorResponse')

// get By Login User Service
const getByLoginUserService = async (login, lang) => {
    try {
        const { rows } = await pool.query(`--sql
            SELECT 
                u.id, 
                u.password, 
                u.login, 
                u.fio,
                a_n.account_number,
                d.doer AS doer_name,
                boss.boss AS boss_name,
                a.adress,
                b.bank AS bank_name,
                b.mfo,
                s.str,
                u.region_id,
                u.image,
                r.name AS region_name
            FROM users AS u 
            LEFT JOIN account_number AS a_n ON a_n.user_id = u.id
            LEFT JOIN doer AS d ON d.user_id = u.id
            LEFT JOIN boss ON boss.user_id = u.id
            LEFT JOIN adress AS a ON a.user_id = u.id
            LEFT JOIN bank AS b ON b.user_id = u.id
            LEFT JOIN str AS s ON s.user_id = u.id
            LEFT JOIN regions AS r ON r.id = u.region_id 
            WHERE u.login = $1 AND u.isdeleted = false
        `, [login])
        const user = rows[0]
        if (!user) {
            throw new ErrorResponse(lang.t('loginError'), 403)
        }
        return user
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

// get By Login Service
const getByLoginService = async (login, lang) => {
    try {
        const { rows } = await pool.query(`
            SELECT 
                u.id
            FROM users AS u 
            WHERE u.login = $1 AND u.isdeleted = false
        `, [login])
        const user = rows[0]
        if (user) {
            throw new ErrorResponse(lang.t('loginExists'), 400)
        }
        return user
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}


// get by id user  
const getBYIdUserService = async (user_id, lang) => {
    try {
        const { rows } = await pool.query(`SELECT id, password, login, fio, image FROM users WHERE id = $1 AND isdeleted = false`, [user_id])
        const user = rows[0]
        if (!user) {
            throw new ErrorResponse(lang.t('userNotFound'), 404)
        }
        return user
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const updateAuthService = async (login, password, fio, image, id) => {
    try {
        const { rows } = await pool.query(`UPDATE users SET login = $1, password = $2, fio = $3, image = $4 WHERE id = $5 RETURNING id, login, fio, image`,
            [login, password, fio, image, id],
        );
        return rows[0]
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

module.exports = {
    getByLoginUserService,
    getBYIdUserService,
    updateAuthService,
    getByLoginService
}