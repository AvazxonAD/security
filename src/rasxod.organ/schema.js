const Joi = require('joi');

exports.RasxodOrganSchema = class {
    static create() {
        return Joi.object({
            body: Joi.object({
                organization_id: Joi.number().integer().required().min(1),
                opisanie: Joi.string().allow(null, '').optional(),
                doc_num: Joi.string().required().pattern(/^\d+(\.\d+)?$/),
                doc_date: Joi.date().required(),
                summa: Joi.number().precision(2).min(1).required(),
                gazna_number_id: Joi.number().integer().min(1).allow(null),
                organ_account_number_id: Joi.number().integer().min(1).allow(null)
            }),
            
            query: Joi.object({
                account_number_id: Joi.number().integer().required().min(1)
            })
        })
    }

    static update() {
        return Joi.object({
            body: Joi.object({
                organization_id: Joi.number().integer().required().min(1),
                opisanie: Joi.string().allow(null, '').optional(),
                doc_num: Joi.string().required().pattern(/^\d+(\.\d+)?$/),
                doc_date: Joi.date().required(),
                summa: Joi.number().precision(2).min(1).required(),
                gazna_number_id: Joi.number().integer().min(1).allow(null),
                organ_account_number_id: Joi.number().integer().min(1).allow(null)
            }),

            query: Joi.object({
                account_number_id: Joi.number().integer().required().min(1)
            }),

            params: Joi.object({
                id: Joi.number().integer().required().min(1)
            })
        })
    }

    static getById() {
        return Joi.object({
            query: Joi.object({
                account_number_id: Joi.number().integer().required().min(1)
            }),

            params: Joi.object({
                id: Joi.number().integer().required().min(1)
            })
        })
    }

    static delete() {
        return Joi.object({
            query: Joi.object({
                account_number_id: Joi.number().integer().required().min(1)
            }),

            params: Joi.object({
                id: Joi.number().integer().required().min(1)
            })
        })
    }

    static get() {
        return Joi.object({
            query: Joi.object({
                account_number_id: Joi.number().integer().required().min(1),
                page: Joi.number().min(1).default(1),
                limit: Joi.number().min(1).default(10),
                search: Joi.string(),
                to: Joi.string().trim().pattern(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/).required(),
                from: Joi.string().trim().pattern(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/).required()
            })
        })
    }
}