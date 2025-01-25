const { db } = require('../db/index');
const { textCyrlToLatin, textLatinToCyrl } = require('../helper/functions')

exports.WorkerDB = class {
    static async workerCreate(params) {
        await db.query(`
            INSERT INTO worker(fio, batalon_id, account_number, xisob_raqam, user_id) 
            VALUES($1, $2, $3, $4, $5)
        `, params)
    }

    static async workerUpdate(params, search = null) {
        await db.query(`
            UPDATE worker 
            SET fio = $1, batalon_id = $2, account_number = $3, xisob_raqam = $4
            WHERE id = $5 AND isdeleted = false
        `, params);
    }

    static async workerGet(params, search = null, batalon_id = null) {
        let filter = ``;
        let batalon_filter = ``;
        if (search) {
            let translate;
            if (/^[a-zA-Z\s]+$/.test(search)) {
                translate = textLatinToCyrl(search);
            } else {
                translate = textCyrlToLatin(search);
            }

            filter = `AND (
                w.fio ILIKE  '%' || $${params.length + 1} || '%' 
                OR w.fio ILIKE '%' || $${params.length + 2} || '%'
            )`;
            params.push(search, translate);
        }

        if (batalon_id) {
            batalon_filter = `AND b.id = $${params.length + 1}`
            params.push(batalon_id)
        }

        const query = `
            WITH data AS (
                SELECT 
                    w.id, w.fio, w.account_number, w.user_id,
                    b.name AS batalon_name, w.xisob_raqam
                FROM worker w 
                LEFT JOIN batalon  b ON b.id = w.batalon_id
                JOIN users u ON w.user_id = u.id
                WHERE w.isdeleted = false AND u.id = $1 
                ${filter} 
                ${batalon_filter} 
                OFFSET $2 LIMIT $3
            )
            SELECT 
                ARRAY_AGG(row_to_json(data)) AS data,
                (
                    SELECT COALESCE(COUNT(w.id), 0)
                    FROM worker w 
                    LEFT JOIN batalon AS b ON b.id = w.batalon_id
                    JOIN users AS u ON w.user_id = u.id
                    WHERE w.isdeleted = false AND u.id = $1 
                    ${filter} 
                    ${batalon_filter}
                )::INTEGER  total_count
            FROM data
        `;

        const result = await db.query(query, params);

        return { data: result[0]?.data || [], total: result[0].total_count }
    }

    static async workerGetById(params, isdeleted = null) {

        const result = await db.query(`
            SELECT 
                w.id, w.fio, w.account_number, w.user_id, 
                b.name AS batalon_name, w.xisob_raqam
            FROM worker w 
            LEFT JOIN batalon AS b ON b.id = w.batalon_id
            JOIN users AS u ON w.user_id = u.id
            WHERE u.id = $1 AND w.id = $2 ${!isdeleted ? 'AND w.isdeleted = false' : ''}
        `, params);

        return result[0];
    }

    static async workerDelete(params) {
        await db.query(`UPDATE worker SET isdeleted = true WHERE id = $1 AND isdeleted = false RETURNING *`, params);
    }

    static async workerGetByAccountNumber(params) {
        const result = await db.query(`
            SELECT * 
            FROM worker 
            WHERE account_number = $1 
                AND isdeleted = false 
                AND user_id = $2
            `, params);
        return result[0];
    }

    static async workerGetByXisobRaqam(params) {
        const result = await db.query(`
            SELECT * 
            FROM worker 
            WHERE xisob_raqam = $1 
                AND isdeleted = false 
                AND user_id = $2
            `, params);
        return result[0];
    }

    static async workerGetByFio(params) {
        const result = await db.query(`
            SELECT * 
            FROM worker 
            WHERE fio = $1 
                AND isdeleted = false 
                AND user_id = $2
            `, params);
        return result[0];
    }
}