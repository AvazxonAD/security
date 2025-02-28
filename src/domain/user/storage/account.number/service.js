const { AccountNumberDB } = require('@account_number/db');

exports.AccountNumberService = class {
    static async getById(data) {
        const result = await AccountNumberDB.getById([data.user_id, data.id]);

        return result[0];
    }
};