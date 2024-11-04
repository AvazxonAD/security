const pool = require('../../config/db');
const ErrorResponse = require('../../utils/errorResponse');

const createContractTemplateService = async (data) => {
    try {
        const result = await pool.query(
            `INSERT INTO contract_shablon (user_id, shablon_name, main_section, section_1, section_2, section_3, section_4, section_5, section_6, section_7) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
            [data.user_id, data.shablon_name, data.main_section, data.section_1, data.section_2, data.section_3, data.section_4, data.section_5, data.section_6, data.section_7]
        );
        return result.rows[0];
    } catch (error) {
        throw new ErrorResponse(error.message, error.statusCode);
    }
};

const getContractTemplatesService = async (user_id) => {
    try {
        const result = await pool.query(`SELECT id, shablon_name FROM contract_shablon WHERE user_id = $1 AND isdeleted = false`, [user_id]);
        return result.rows;
    } catch (error) {
        throw new ErrorResponse(error.message, error.statusCode);
    }
};

const checkNameService = async (user_id, shablon_name) => {
    try {
        const result = await pool.query(`SELECT * FROM contract_shablon WHERE user_id = $1 AND isdeleted = false AND shablon_name = $2 `, [user_id, shablon_name]);
        if (result.rows[0]) {
            throw new ErrorResponse('This data already exist', 409);
        }
        return result.rows[0];
    } catch (error) {
        throw new ErrorResponse(error.message, error.statusCode);
    }
};

const getContractTemplateByIdService = async (user_id, id, isdeleted = false) => {
    try {
        let ignore = ``
        if(!isdeleted){
            ignore = ` AND isdeleted = false`
        }
        const result = await pool.query(`SELECT * FROM contract_shablon WHERE id = $1 AND user_id = $2 ${ignore}`, [id, user_id]);
        if (!result.rows[0]) {
            throw new ErrorResponse('Shablon topilmadi', 404);
        }
        return result.rows[0];
    } catch (error) {
        throw new ErrorResponse(error.message, error.statusCode);
    }
};

const updateContractTemplateService = async (data) => {
    try {
        const result = await pool.query(
            `UPDATE contract_shablon 
            SET shablon_name = $1, main_section = $2, section_1 = $3, section_2 = $4, section_3 = $5, 
                section_4 = $6, section_5 = $7, section_6 = $8, section_7 = $9 
            WHERE id = $10 RETURNING *`,
            [data.shablon_name, data.main_section, data.section_1, data.section_2, data.section_3, data.section_4, data.section_5, data.section_6, data.section_7, data.id]
        );
        if (!result.rows[0]) {
            throw new ErrorResponse('Shablon yangilanishi mumkin emas', 404);
        }
        return result.rows[0];
    } catch (error) {
        throw new ErrorResponse(error.message, error.statusCode);
    }
};

const deleteContractTemplateService = async (id) => {
    try {
        await pool.query(`DELETE FROM contract_shablon WHERE id = $1 RETURNING *`, [id]);
    } catch (error) {
        throw new ErrorResponse(error.message, error.statusCode);
    }
};

module.exports = {
    createContractTemplateService,
    getContractTemplatesService,
    getContractTemplateByIdService,
    updateContractTemplateService,
    deleteContractTemplateService,
    checkNameService
};
