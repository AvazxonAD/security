const { db } = require('@db/index');
const { OrganizationDB } = require('@organization/db');

exports.OrganizationService = class {
    static async getById(data) {
        const result = await OrganizationDB.getById([data.user_id, data.id]);

        return result[0];
    }

    static async create(data) {
        const result = await db.transaction(async client => {
            await OrganizationDB.create([
                data.name, data.address,
                data.str, data.bank_name,
                data.mfo, data.user_id
            ], client);

            for (let account_number of data.account_numbers) {
                
            }
        })
    }
};