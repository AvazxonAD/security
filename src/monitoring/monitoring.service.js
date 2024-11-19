const pool = require('../config/db')
const ErrorResponse = require('../utils/errorResponse')

const prixodRasxodService = async (user_id, account_number_id, from, to, offset, limit) => {
    try {
        const { rows } = await pool.query(`
            SELECT 
                t.id AS tashkilot_id,
                t.name AS tashkilot_name,
                t.address AS tashkilot_address,
                t.str AS tashkilot_inn,
                p.id,
                p.doc_num,
                TO_CHAR(p.doc_date, 'YYYY-MM-DD') AS doc_date,
                p.opisanie,
                0::FLOAT AS rasxod_sum,
                p.summa::FLOAT AS prixod_sum    
            FROM prixod AS p 
            JOIN contract AS c ON c.id = p.contract_id
            JOIN organization AS t ON t.id = c.organization_id
            WHERE p.user_id = $1 AND p.isdeleted = false AND p.account_number_id = $2 AND p.doc_date BETWEEN $3 AND $4 AND c.isdeleted = false

            UNION ALL 

            SELECT 
                t.id AS tashkilot_id,
                t.name AS tashkilot_name,
                t.address AS tashkilot_address,
                t.str AS tashkilot_inn,
                r_d.id,
                r_d.doc_num,
                TO_CHAR(r_d.doc_date, 'YYYY-MM-DD') AS doc_date,
                r_d.opisanie,
                COALESCE(SUM(t_k.result_summa), 0)::FLOAT AS rasxod_sum,
                0::FLOAT AS prixod_sum
            FROM rasxod_doc AS r_d
            JOIN rasxod AS r ON r_d.id = r.rasxod_doc_id
            JOIN task AS t_k ON t_k.id = r.task_id
            JOIN contract AS c ON c.id = t_k.contract_id
            JOIN batalon AS t ON t.id = t_k.batalon_id
            WHERE r_d.user_id = $1 AND r_d.isdeleted = false AND r_d.account_number_id = $2 AND r_d.doc_date BETWEEN $3 AND $4 AND c.isdeleted = false
            GROUP BY t.id, t.name, t.address, t.str, r_d.id, r_d.doc_num, r_d.doc_date, r_d.opisanie

            UNION ALL 

            SELECT 
                t.id AS tashkilot_id,
                t.name AS tashkilot_name,
                t.address AS tashkilot_address,
                t.str AS tashkilot_inn,
                r_d.id,
                r_d.doc_num,
                TO_CHAR(r_d.doc_date, 'YYYY-MM-DD') AS doc_date,
                r_d.opisanie,
                COALESCE(SUM(r.summa), 0)::FLOAt AS rasxod_sum,
                0::FLOAT AS prixod_sum    
            FROM rasxod_fio_doc AS r_d
            JOIN rasxod_fio AS r ON r_d.id = r.rasxod_fio_doc_id
            JOIN worker_task AS w_t ON w_t.id = r.worker_task_id
            JOIN task AS t_k ON t_k.id = w_t.task_id
            JOIN contract AS c ON c.id = t_k.contract_id
            JOIN batalon AS t ON t.id = t_k.batalon_id
            WHERE r_d.user_id = $1 AND r_d.isdeleted = false AND r_d.account_number_id = $2 AND r_d.doc_date BETWEEN $3 AND $4 AND c.isdeleted = false
            GROUP BY t.id, t.name, t.address, t.str, r_d.id, r_d.doc_num, r_d.doc_date, r_d.opisanie
            ORDER BY doc_date
            OFFSET $5 LIMIT $6
        `, [user_id, account_number_id, from, to, offset, limit])

        const total = await pool.query(`
            SELECT 
                (SELECT COALESCE(COUNT(p.id), 0)::INTEGER 
                FROM prixod AS p 
                JOIN contract AS c ON c.id = p.contract_id
                JOIN organization AS t ON t.id = c.organization_id
                WHERE p.user_id = $1 AND p.isdeleted = false AND p.account_number_id = $2 AND p.doc_date BETWEEN $3 AND $4 AND c.isdeleted = false) + 
                (SELECT COALESCE(COUNT( DISTINCT r_d.id), 0)::INTEGER
                FROM rasxod_doc AS r_d
                JOIN rasxod AS r ON r_d.id = r.rasxod_doc_id
                JOIN task AS t_k ON t_k.id = r.task_id
                JOIN contract AS c ON c.id = t_k.contract_id
                JOIN batalon AS t ON t.id = t_k.batalon_id
                WHERE r_d.user_id = $1 AND r_d.isdeleted = false AND r_d.account_number_id = $2 AND r_d.doc_date BETWEEN $3 AND $4 AND c.isdeleted = false) + 
                (SELECT COALESCE(COUNT(DISTINCT r_d.id), 0)::INTEGER  
                FROM rasxod_fio_doc AS r_d
                JOIN rasxod_fio AS r ON r_d.id = r.rasxod_fio_doc_id
                JOIN worker_task AS w_t ON w_t.id = r.worker_task_id
                JOIN task AS t_k ON t_k.id = w_t.task_id
                JOIN contract AS c ON c.id = t_k.contract_id
                JOIN batalon AS t ON t.id = t_k.batalon_id
                WHERE r_d.user_id = $1 AND r_d.isdeleted = false AND r_d.account_number_id = $2 AND r_d.doc_date BETWEEN $3 AND $4 AND c.isdeleted = false) AS total_count
        `, [user_id, account_number_id, from, to])
        const prixod_from = await pool.query(`
            SELECT COALESCE(SUM(p.summa), 0)::FLOAT AS summa 
            FROM prixod AS p 
            JOIN contract AS c ON c.id = p.contract_id
            WHERE p.user_id = $1 AND p.account_number_id = $2 AND p.doc_date < $3 AND c.isdeleted = false AND p.isdeleted = false
        `, [user_id, account_number_id, from])
        const prixod_summa_from = prixod_from.rows.length > 0 ? prixod_from.rows[0].summa : 0
        const rasxod_from = await pool.query(`
            SELECT 
                COALESCE(SUM(t_k.result_summa), 0)::FLOAT AS summa
            FROM rasxod_doc AS r_d
            JOIN rasxod AS r ON r_d.id = r.rasxod_doc_id
            LEFT JOIN task AS t_k ON t_k.id = r.task_id
            LEFT JOIN contract AS c ON c.id = t_k.contract_id
            LEFT JOIN batalon AS t ON t.id = t_k.batalon_id
            WHERE r_d.user_id = $1 AND r_d.isdeleted = false 
            AND r_d.account_number_id = $2 
            AND r_d.doc_date < $3 
            AND c.isdeleted = false
        `, [user_id, account_number_id, from]);
        const rasxod_summa_from = rasxod_from.rows.length > 0 ? rasxod_from.rows[0].summa : 0
        const rasxod_fio_from = await pool.query(`
            SELECT 
            COALESCE(SUM(r.summa), 0)::FLOAT AS summa 
            FROM rasxod_fio_doc AS r_d
            JOIN rasxod_fio AS r ON r_d.id = r.rasxod_fio_doc_id
            JOIN worker_task AS w_t ON w_t.id = r.worker_task_id
            JOIN task AS t_k ON t_k.id = w_t.task_id
            JOIN contract AS c ON c.id = t_k.contract_id
            JOIN batalon AS t ON t.id = t_k.batalon_id
            WHERE r_d.user_id = $1 AND r_d.isdeleted = false AND r_d.account_number_id = $2 AND r_d.doc_date < $3 AND c.isdeleted = false
        `, [user_id, account_number_id, from])
        const rasxod_fio_summa_from = rasxod_fio_from.rows.length > 0 ? rasxod_fio_from.rows[0].summa : 0
        const summa_from = prixod_summa_from - (rasxod_fio_summa_from + rasxod_summa_from)
        const prixod_to = await pool.query(`
            SELECT COALESCE(SUM(p.summa), 0)::FLOAT AS summa 
            FROM prixod AS p 
            JOIN contract AS c ON c.id = p.contract_id
            WHERE p.user_id = $1 AND p.account_number_id = $2 AND p.doc_date < $3 AND c.isdeleted = false AND p.isdeleted = false
        `, [user_id, account_number_id, to])
        const prixod_summa_to = prixod_to.rows.length > 0 ? prixod_to.rows[0].summa : 0
        const rasxod_to = await pool.query(`
            SELECT 
            COALESCE(SUM(t_k.result_summa), 0)::FLOAT AS summa
            FROM rasxod AS r
            JOIN rasxod_doc AS r_d ON r_d.id = r.rasxod_doc_id
            JOIN task AS t_k ON t_k.id = r.task_id
            JOIN contract AS c ON c.id = t_k.contract_id
            JOIN batalon AS t ON t.id = t_k.batalon_id
            WHERE r_d.user_id = $1 AND r_d.isdeleted = false 
            AND r_d.account_number_id = $2 
            AND r_d.doc_date < $3 
            AND c.isdeleted = false
        `, [user_id, account_number_id, to]);
        const rasxod_summa_to = rasxod_to.rows.length > 0 ? rasxod_to.rows[0].summa : 0
        const rasxod_fio_to = await pool.query(`
            SELECT 
            COALESCE(SUM(r.summa), 0)::FLOAT AS summa
            FROM rasxod_fio_doc AS r_d
            JOIN rasxod_fio AS r ON r_d.id = r.rasxod_fio_doc_id
            JOIN worker_task AS w_t ON w_t.id = r.worker_task_id
            JOIN task AS t_k ON t_k.id = w_t.task_id
            JOIN contract AS c ON c.id = t_k.contract_id
            WHERE r_d.user_id = $1 AND r_d.isdeleted = false AND r_d.account_number_id = $2 AND r_d.doc_date < $3 AND c.isdeleted = false
        `, [user_id, account_number_id, to])
        const rasxod_fio_summa_to = rasxod_fio_to.rows.length > 0 ? rasxod_fio_to.rows[0].summa : 0
        const summa_to = prixod_summa_to - (rasxod_fio_summa_to + rasxod_summa_to)
        let prixod = 0;
        let rasxod = 0;
        rows.forEach(item => { prixod += item.prixod_sum, rasxod += item.rasxod_sum })
        return { rows, total: total.rows[0].total_count, summa_from, summa_to, prixod, rasxod }
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

const monitoringService = async (user_id, account_number_id, year, month) => {
    try {
        const byBatalon = await pool.query(`
            SELECT 
                id,
                name,
                address
            FROM batalon
            WHERE user_id = $1 AND isdeleted = false 
        `, [user_id])
        let itogo = 0;
        for (let batalon of byBatalon.rows) {
            const result = await pool.query(`
                SELECT 
                    COALESCE(SUM(t.result_summa), 0)::FLOAT AS sum,
                    COALESCE(COUNT(t.id), 0)::INTEGER AS count
                FROM task AS t
                LEFT JOIN contract AS c ON c.id = t.contract_id
                WHERE c.isdeleted = false 
                AND t.batalon_id = $1
                AND 0 = ( SELECT (c.result_summa - COALESCE(SUM(summa), 0))::FLOAT FROM prixod WHERE isdeleted = false AND contract_id = c.id)
                AND c.account_number_id = $2
                AND EXTRACT(YEAR FROM c.doc_date) = $3
                AND EXTRACT(MONTH FROM c.doc_date) = $4
            `, [batalon.id, account_number_id, year, month])
            batalon.summa = result.rows[0].sum
            batalon.count = result.rows[0].count
            itogo += batalon.summa
        }
        const batalon_result = byBatalon.rows.map(item => {
            if(item.summa === 0){
                item.percent = 0
            }else {
                item.percent = Math.round((item.summa * 100 / itogo) * 100) / 100
            }
            return item;
        })
        for (let batalon of byBatalon.rows) {
            for(let i = 1; i <= 12; i++){
                const result = await pool.query(`
                    SELECT 
                        COALESCE(SUM(t.result_summa), 0)::FLOAT AS sum,
                        COALESCE(COUNT(t.id), 0)::INTEGER AS count
                    FROM task AS t
                    LEFT JOIN contract AS c ON c.id = t.contract_id
                    WHERE c.isdeleted = false 
                    AND t.batalon_id = $1
                    AND 0 = ( SELECT (c.result_summa - COALESCE(SUM(summa), 0))::FLOAT FROM prixod WHERE isdeleted = false AND contract_id = c.id)
                    AND c.account_number_id = $2
                    AND EXTRACT(YEAR FROM c.doc_date) = $3
                    AND EXTRACT(MONTH FROM c.doc_date) = $4
                `, [batalon.id, account_number_id, year, i])
                batalon[i] = result.rows[0].sum
            }
        } 
        const workers = await pool.query(`
                SELECT 
                    b.name AS batalon_name,
                    w.fio,
                    (
                        SELECT COALESCE(SUM(w_t.summa), 0)
                        FROM worker_task AS w_t
                        JOIN task AS t ON t.id = w_t.task_id
                        JOIN contract AS c ON c.id = t.contract_id
                        WHERE w_t.id = w.id AND w_t.isdeleted = false 0 = ( SELECT (c.result_summa - COALESCE(SUM(summa), 0))::FLOAT FROM prixod WHERE isdeleted = false AND contract_id = c.id)
                    ) AS summa,
                FROM worker AS w
                JOIN batalon AS b ON b.id = w.batalon_id
                JOIN users AS u ON u.id = b.user_id
                WHERE u.id = $1 AND w.isdeleted = false
        `[user_id])

        console.log(workers.rows)
        batalon_result.sort((a, b) => b.percent - a.percent)
        return { itogo, byBatalon: batalon_result }
    } catch (error) {
        throw new ErrorResponse(error, error.statusCode)
    }
}

module.exports = {
    prixodRasxodService,
    monitoringService
}