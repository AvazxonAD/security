const Joi = require('joi');


exports.Schema = class {
    static createSchema() {
        return Joi.object({
            body: Joi.object({
                fio: Joi.string().trim().required(),
                batalon_id: Joi.number().min(1).integer().allow(null),
                account_number: Joi.string().trim().required(),
                xisob_raqam: Joi.string().trim().required()
            })
        }).options({ stripUnknown: true });;
    }

    static importSchema() {
        return Joi.object({
            FIO: Joi.string().trim().required(),
            Batalon: Joi.string().trim(),
            Karta_raqam: Joi.string().trim(),
            Xisob_raqam: Joi.string().trim()
        }).options({ stripUnknown: true });;
    }

    static updateSchema() {
        return Joi.object({
            body: Joi.object({
                fio: Joi.string().trim().required(),
                batalon_id: Joi.number().min(1).integer().allow(null),
                account_number: Joi.string().trim().required(),
                xisob_raqam: Joi.string().trim().required()
            }),
            params: Joi.object({
                id: Joi.number().required().min(1).integer(),
            })
        }).options({ stripUnknown: true });;
    }

    static exportSchema() {
        return Joi.object({
            query: Joi.object({
                batalon_id: Joi.number().min(1).integer(),
                search: Joi.string().trim()
            })
        }).options({ stripUnknown: true });;
    }
}