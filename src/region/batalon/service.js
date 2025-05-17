const { BatalonDB } = require("./db");

exports.BatalonService = class {
  static async getById(data) {
    const result = await BatalonDB.getById(
      [data.user_id, data.id],
      data.isdeleted
    );
    return result;
  }

  static async getByBatalonId(data) {
    const result = await BatalonDB.getByBatalonId([data.id]);
    return result;
  }

  static async getByName(data) {
    const batalon = await BatalonDB.getByName([data.user_id, data.name]);
    return batalon;
  }
};
