const { db } = require('../db/index');

exports.OrganizationDB = class {
    static async getById(params, isdeleted) {
        const query = `
            SELECT id, name, address, str, bank_name, mfo, account_number, treasury1, treasury2
            FROM organization
            WHERE user_id = $1 
                AND id = $2
                ${!isdeleted ? 'AND isdeleted = false' : ''}        
        `;

        const result = db.query(query, params);
        
        return result[0];
    }
}