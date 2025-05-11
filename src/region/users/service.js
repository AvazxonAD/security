const { UsersDB } = require(`./db`);

exports.UsersService = class {
  static now = new Date();

  static async create(data) {
    const result = await UsersDB.create([
      data.fio,
      data.login,
      data.password,
      data.image,
      data.batalon_id,
      data.user_id,
      this.now,
      this.now,
    ]);

    return result;
  }

  static async get(data) {
    const result = await UsersDB.get([data.user_id, data.offset, data.limit]);

    for (let item of result.data) {
      delete item.password;
    }

    return result;
  }

  static async getById(data) {
    const result = await UsersDB.getById([data.id, data.user_id]);

    if (result) {
      delete result.password;
    }

    return result;
  }

  static async getByBatalonId(data) {
    const result = await UsersDB.getByBatalonId([
      data.batalon_id,
      data.user_id,
    ]);

    return result;
  }

  static async update(data) {
    const result = await UsersDB.update([
      data.fio,
      data.login,
      data.password,
      data.url,
      data.batalon_id,
      this.now,
      data.id,
    ]);

    return result;
  }

  static async delete(data) {
    const result = await UsersDB.delete([data.id]);

    return result;
  }
};
