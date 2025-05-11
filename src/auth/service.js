const { AuthDB } = require("./db");

exports.AuthService = class {
  static async getByLogin(data) {
    const result = await AuthDB.getByLogin([data.login]);

    return result;
  }
};
