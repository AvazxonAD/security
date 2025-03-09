const { RasxodOrganDB } = require('./db');

exports.RasxodOrganService = class {
    static async create(data) {
        const result = await RasxodOrganDB.create([
            data.user_id,
            data.organization_id,
            data.opisanie,
            data.doc_num,
            data.doc_date,
            data.summa,
            data.account_number_id,
            data.organ_account_number_id,
            data.gazna_number_id
        ]);

        return result;
    }

    static async update(data) {
        const result = await RasxodOrganDB.update([
            data.organization_id,
            data.opisanie,
            data.doc_num,
            data.doc_date,
            data.summa,
            data.organ_account_number_id,
            data.gazna_number_id,
            data.id
        ]);

        return result;
    }

    static async get(data) {
        const result = await RasxodOrganDB.get([
            data.user_id,
            data.from,
            data.to,
            data.account_number_id,
            data.offset,
            data.limit
        ], data.search);

        return result;
    }

    static async getById(data) {
        const result = await RasxodOrganDB.getById([data.user_id, data.id, data.account_number_id], data.isdeleted);

        return result;
    }

    static async delete(data) {
        const result = await RasxodOrganDB.delete([data.id]);

        return result;
    }
}