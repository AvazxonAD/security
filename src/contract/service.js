const { ContractDB } = require('./db')

exports.ContractService = class {
    static async checkDoc(data) {
        const result = await ContractDB.checkDoc([data.id]);

        return result;
    }
}