const { BatalonTaskDB } = require(`./db`);

exports.BatalonTasksService = class {
  static now = new Date();
  static async get(data) {
    const result = await BatalonTaskDB.get(
      [data.batalon_id, data.from, data.to, data.offset, data.limit, this.now],
      data
    );

    return result;
  }
};
