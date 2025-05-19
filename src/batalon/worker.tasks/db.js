const { db } = require(`@db/index`);

exports.WorkerTaskDB = class {
  static async checkDoc(params) {
    const query = `--sql
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

  static async create(params, client) {
    const query = `INSERT INTO worker_task(worker_id, task_id, summa, task_time) VALUES($1, $2, $3, $4)`;

    await client.query(query, params);
  }

  static async getByTaskId(params, search = null) {
    let filter = ``;

    if (search) {
      let translate;
      if (/^[a-zA-Z\s]+$/.test(search)) {
        translate = textLatinToCyrl(search);
      } else {
        translate = textCyrlToLatin(search);
      }

      filter = `
        AND (
            w.fio ILIKE  '%' || $${params.length + 1} || '%' 
            OR w.fio ILIKE '%' || $${params.length + 2} || '%'
        )
      `;

      params.push(search, translate);
    }

    const result = await db.query(
      `--sql
        SELECT 
            w_t.worker_id, 
            w.fio, 
            SUM(w_t.summa)::FLOAT AS summa, 
            SUM(w_t.task_time) AS task_time
        FROM worker_task AS w_t
        JOIN worker AS w ON w.id = w_t.worker_id 
        WHERE w_t.task_id = $1 
            AND w_t.isdeleted = false
            ${filter}
        GROUP BY w.fio, w_t.worker_id
    `,
      params
    );

    return result;
  }

  static async deleteByTaskId(params, client) {
    const query = `UPDATE worker_task SET isdeleted = true WHERE worker_id = $1  AND task_id = $2`;

    await client.query(query, params);
  }

  static async delete(params, client) {
    const query = `UPDATE worker_task SET isdeleted = true WHERE id = $1`;

    await client.query(query, params);
  }
};
