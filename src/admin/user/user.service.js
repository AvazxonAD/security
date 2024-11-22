const pool = require('../../config/db');
const ErrorResponse = require('../../utils/errorResponse');
const { tashkentTime } = require('../../utils/date.functions')

const userCreateService = async (data) => {
    try {
        const result = await pool.query(`INSERT INTO users
            (
                fio, 
                login, 
                password, 
                image, 
                region,
                created_at,
                updated_at
            ) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [
            data.fio,
            data.login,
            data.password,
            data.url,
            data.region,
            tashkentTime(),
            tashkentTime()
        ]);
        return result.rows[0];
    } catch (error) {
        throw new ErrorResponse(error.message, error.statusCode);
    }
};

const userUpdateService = async (data) => {
    try {
        const result = await pool.query(`UPDATE users SET 
            fio = $1, 
            login = $2,
            password = $3, 
            image = $4, 
            region = $5,
            updated_at = $6
            WHERE id = $7 RETURNING *`, [
            data.fio,
            data.login,
            data.password,
            data.url,
            data.region,
            tashkentTime(),
            data.id
        ]);
        return result.rows[0];
    } catch (error) {
        throw new ErrorResponse(error.message, error.statusCode);
    }
};

const getByIdUserService = async (id) => {
    try {
        const result = await pool.query(`SELECT id, fio, login, image, region, created_at
            FROM users WHERE isdeleted = false AND id = $1 AND region IS NOT NULL`, [id]);
        return result.rows[0];
    } catch (error) {
        throw new ErrorResponse(error.message, error.statusCode);
    }
};

const deleteuserService = async (id) => {
    try {
        const result = await pool.query(`UPDATE users SET isdeleted = true WHERE id = $1 AND isdeleted = false AND region IS NOT NULL RETURNING *`, [id]);
        return result.rows[0];
    } catch (error) {
        throw new ErrorResponse(error.message, error.statusCode);
    }
};

const getUserService = async () => {
    try {
        const result = await pool.query(`SELECT id, fio, login, image, region, created_at
            FROM users WHERE isdeleted = false AND region IS NOT NULL`);
        return result.rows;
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

module.exports = {
    userCreateService,
    userUpdateService,
    getUserService,
    deleteuserService,
    getByIdUserService
};
