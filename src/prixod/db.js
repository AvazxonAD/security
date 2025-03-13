const { db } = require(`@db/index`);

exports.PrixodDB = class {
  static async checkDocs(params) {
    const query = `
        SELECT 
            d.id,
            d.doc_num,
            d.doc_date,
            'prixod' AS type 
        FROM rasxod_fio_doc d
        JOIN rasxod_fio ch ON ch.rasxod_fio_doc_id = d.id
        JOIN worker_task AS w_t ON w_t.id = ch.worker_task_id 
        JOIN task AS t ON t.id = w_t.task_id
        WHERE t.contract_id = $1 
            AND d.isdeleted = false 
        
        UNION ALL 
    
        SELECT 
            d.id,
            d.doc_num,
            d.doc_date,
            'prixod' AS type
        FROM rasxod_doc d
        JOIN rasxod ch ON ch.rasxod_doc_id = d.id
        JOIN task AS t ON t.id = ch.task_id
        WHERE t.contract_id = $1 
            AND d.isdeleted = false
    `;

    const data = await db.query(query, params);

    return data;
  }
};
