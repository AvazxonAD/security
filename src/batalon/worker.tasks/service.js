const { WorkerTaskDB } = require(`./db`);

exports.WorkerTaskService = class {
    static async checkDoc(data) {
        const result = await WorkerTaskDB.checkDoc([data.task_id]);

        return result;
    }
}