const { BatalonDB } = require('./db');

exports.BatalonService = class {
    static async batalonGetById(data) {
        const result = await BatalonDB.batalonGetById([data.user_id, data.id], data.isdeleted);
        return result;
    }

    static async batalonGetByName(data) {
        const batalon = await BatalonDB.batalonGetByName([data.user_id, data.name]);
        return batalon;
    }
}