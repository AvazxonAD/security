const { BxmDB } = require('./db');

const BxmService = class {
    static async deleteBxm(data) {
        const result = await BxmDB.deleteBxm([data.id]);
        
        return result;
    }

    static async getByIdBxm(data) {
        const result = await BxmDB.getByIdBxm([data.user_id, data.id]);

        return result;
    }
}

module.exports = { BxmService };