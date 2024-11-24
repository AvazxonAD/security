const pool = require('../../config/db');
const ErrorResponse = require('../../utils/errorResponse');
const { tashkentTime } = require('../../utils/date.functions')


const checkByRegionUser = async (region_id) =>  {
    try {
        const result = await pool.query(`SELECT 
            u.id, u.fio, u.login, u.image, u.region_id, u.created_at, r.name
            FROM users AS u 
            JOIN regions AS r ON r.id = u.region_id 
            WHERE u.isdeleted = false AND u.region_id = $1
        `, [region_id]);
        if(result.rows[0]){
            throw new ErrorResponse('this information already exists', 409);
        };
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const userCreateService = async (data) => {
    try {
        const result = await pool.query(`INSERT INTO users
            (
                fio, 
                login, 
                password, 
                image, 
                region_id,
                created_at,
                updated_at
            ) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [
            data.fio,
            data.login,
            data.password,
            data.url,
            data.region_id,
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
            region_id = $5,
            updated_at = $6
            WHERE id = $7 RETURNING *`, [
            data.fio,
            data.login,
            data.password,
            data.url,
            data.region_id,
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
        const result = await pool.query(`SELECT 
            u.id, u.fio, u.login, u.image, u.region_id, u.created_at, r.name
            FROM users AS u 
            JOIN regions AS r ON r.id = u.region_id 
            WHERE u.isdeleted = false AND u.id = $1 AND u.region_id IS NOT NULL
        `, [id]);
        if(!result.rows[0]){
            throw new ErrorResponse('user not found', 404);
        };
        return result.rows[0];
    } catch (error) {
        throw new ErrorResponse(error.message, error.statusCode);
    }
};

const deleteuserService = async (id) => {
    try {
        const result = await pool.query(`UPDATE users SET isdeleted = true WHERE id = $1 AND isdeleted = false AND region_id IS NOT NULL RETURNING *`, [id]);
        return result.rows[0];
    } catch (error) {
        throw new ErrorResponse(error.message, error.statusCode);
    }
};

const getUserService = async () => {
    try {
        const result = await pool.query(`SELECT 
            u.id, u.fio, u.login, u.image, u.region_id, u.created_at, r.name
            FROM users u 
            JOIN regions AS r ON r.id = u.region_id 
            WHERE u.isdeleted = false AND u.region_id IS NOT NULL
        `);
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
    getByIdUserService,
    checkByRegionUser
};
