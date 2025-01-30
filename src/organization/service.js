const { OrganizationDB } = require('./db');

exports.OrganizationService = class {
    static async getById(data) {
        const result = await OrganizationDB.getById([data.user_id, data.id]);

        return result[0];
    }
};