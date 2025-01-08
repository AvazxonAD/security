const pool = require('../../config/db');
const ErrorResponse = require('../../utils/errorResponse');

const createContractTemplateService = async (data) => {
    try {
        const result = await pool.query(
            `INSERT INTO contract_shablon (
                user_id, 
                shablon_name, 
                title,
                main_section, 
                section_1, section_1_title,
                section_2, section_2_title,
                section_3, section_3_title,
                section_4, section_4_title,
                section_5, section_5_title,
                section_6, section_6_title,
                section_7, section_7_title
            ) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18) 
            RETURNING *`,
            [
                data.user_id, data.shablon_name, data.title,
                data.main_section,
                data.section_1, data.section_1_title,
                data.section_2, data.section_2_title,
                data.section_3, data.section_3_title,
                data.section_4, data.section_4_title,
                data.section_5, data.section_5_title,
                data.section_6, data.section_6_title,
                data.section_7, data.section_7_title
            ]
        );
        return result.rows[0];
    } catch (error) {
        throw new ErrorResponse(error.message, error.statusCode || 500);
    }
};

const getContractTemplatesService = async (user_id) => {
    try {
        const result = await pool.query(
            `SELECT id, shablon_name FROM contract_shablon WHERE user_id = $1 AND isdeleted = false`,
            [user_id]
        );
        return result.rows;
    } catch (error) {
        throw new ErrorResponse(error.message, error.statusCode || 500);
    }
};

const getContractTemplateByIdService = async (user_id, id, edit, isdeleted = false) => {
    try {
        const ignoreDeleted = isdeleted ? '' : 'AND isdeleted = false';
        const result = await pool.query(
            `SELECT * FROM contract_shablon WHERE id = $1 AND user_id = $2 ${ignoreDeleted}`,
            [id, user_id]
        );
        if (!result.rows[0]) {
            throw new ErrorResponse('Shablon topilmadi', 404);
        }
        const data = result.rows[0]
        if (edit === 'true') {
            return data;
        } else {
            const regex = /(\d+\.\d+ [^(\d+\.\d+)]*)/g;
            data.main_section = [data.main_section];
            data.section_1 = data.section_1.match(regex)?.map(item => item + '.');
            data.section_2 = data.section_2.match(regex)?.map(item => item + '.');
            data.section_3 = data.section_3.match(regex)?.map(item => item + '.');
            data.section_4 = data.section_4.match(regex)?.map(item => item + '.');
            data.section_5 = data.section_5.match(regex)?.map(item => item + '.');
            data.section_6 = data.section_6.match(regex)?.map(item => item + '.');
            data.section_7 = data.section_7.match(regex)?.map(item => item + '.');
            return data;
        }
    } catch (error) {
        throw new ErrorResponse(error.message, error.statusCode || 500);
    }
};

const updateContractTemplateService = async (data) => {
    try {
        const result = await pool.query(
            `UPDATE contract_shablon 
            SET 
                shablon_name = $1, title = $2, 
                main_section = $3, 
                section_1 = $4, section_1_title = $5,
                section_2 = $6, section_2_title = $7,
                section_3 = $8, section_3_title = $9,
                section_4 = $10, section_4_title = $11,
                section_5 = $12, section_5_title = $13,
                section_6 = $14, section_6_title = $15,
                section_7 = $16, section_7_title = $17,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $18 RETURNING *`,
            [
                data.shablon_name, data.title,
                data.main_section,
                data.section_1, data.section_1_title,
                data.section_2, data.section_2_title,
                data.section_3, data.section_3_title,
                data.section_4, data.section_4_title,
                data.section_5, data.section_5_title,
                data.section_6, data.section_6_title,
                data.section_7, data.section_7_title,
                data.id
            ]
        );
        if (!result.rows[0]) {
            throw new ErrorResponse('Shablon yangilanishi mumkin emas', 404);
        }
        return result.rows[0];
    } catch (error) {
        throw new ErrorResponse(error.message, error.statusCode || 500);
    }
};

const deleteContractTemplateService = async (id) => {
    try {
        const result = await pool.query(
            `DELETE FROM contract_shablon WHERE id = $1 RETURNING *`,
            [id]
        );
        if (!result.rows[0]) {
            throw new ErrorResponse('Shablon topilmadi', 404);
        }
        return result.rows[0];
    } catch (error) {
        throw new ErrorResponse(error.message, error.statusCode || 500);
    }
};

const checkNameService = async (user_id, shablon_name) => {
    try {
        const result = await pool.query(
            `SELECT * FROM contract_shablon WHERE user_id = $1 AND isdeleted = false AND shablon_name = $2`,
            [user_id, shablon_name]
        );
        if (result.rows[0]) {
            throw new ErrorResponse('Bu shablon nomi allaqachon mavjud', 409);
        }
        return result.rows[0];
    } catch (error) {
        throw new ErrorResponse(error.message, error.statusCode || 500);
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
