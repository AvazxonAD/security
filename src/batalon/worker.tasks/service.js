const { WorkerTaskDB } = require(`./db`);
const { db } = require(`@db/index`);

exports.WorkerTaskService = class {
  static async get(data) {
    const result = await WorkerTaskDB.get(
      [data.task_id],
      data.search,
      data.worker_id
    );

    return result;
  }

  static async checkDoc(data) {
    const result = await WorkerTaskDB.checkDoc([data.task_id]);

    return result;
  }

  static createCompilitaion(data) {
    const promises = [];
    const one_time_summa =
      data.task.result_summa / data.task.worker_number / data.task.task_time;

    for (let worker of data.workers) {
      const summa = one_time_summa * worker.task_time;

      promises.push(
        WorkerTaskDB.create(
          [worker.worker_id, data.task.id, summa, worker.task_time],
          data.client
        )
      );
    }

    return promises;
  }

  static async create(data) {
    await db.transaction(async (client) => {
      const promises = this.createCompilitaion({ ...data, client });

      await Promise.all(promises);
    });
  }

  static async update(data) {
    await db.transaction(async (client) => {
      await WorkerTaskDB.deleteByTaskId([data.task.id], client);

      const promises = this.createCompilitaion({ ...data, client });

      await Promise.all(promises);
    });
  }

  static async delete(data) {
    await WorkerTaskDB.delete([data.worker_id, data.task_id]);
  }
};
