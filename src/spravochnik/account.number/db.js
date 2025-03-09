const { db } = require('@db/index');

exports.AccountNumberDB = class {
    static async getById(params, isdeleted) {
        const query = `
            SELECT id, account_number
            FROM account_number
            WHERE user_id = $1 
                AND id = $2
                ${!isdeleted ? 'AND isdeleted = false' : ''}        
        `;

        const result = db.query(query, params);

        return result[0];
    }
}