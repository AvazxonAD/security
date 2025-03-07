const { db } = require(`@db/index`);

exports.WorkerTaskDB = class {
    static async checkDoc(params) {
        const query = `
            SELECT 
                DISTINCT 
                rfd.id,
                rfd.doc_date,
                rfd.doc_num  
            FROM worker_task w 
            JOIN rasxod_fio rf ON rf.worker_task_id = w.id
            JOIN rasxod_fio_doc rfd ON rfd.id = rf.rasxod_fio_doc_id
            WHERE w.task_id = $1 
                AND w.isdeleted = false
                AND rfd.isdeleted = false
        `;

        const result = await db.query(query, params);

        return result;
    }
}