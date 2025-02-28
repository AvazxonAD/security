const Joi = require('joi');

exports.ContractSchema = class {
    static create() {
        return Joi.object({
            body: Joi.object({
                doc_num: Joi.string().trim().required().pattern(/^\d+(\.\d+)?$/),
                doc_date: Joi.string().trim().pattern(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/).required(),
                period: Joi.string().trim().pattern(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/).required(),
                adress: Joi.string().trim().required(),
                start_date: Joi.string().trim().pattern(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/).required(),
                end_date: Joi.string().trim().pattern(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/).required(),
                start_time: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).allow('', null),
                end_time: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).allow('', null),
                discount: Joi.number().min(0).default(0).max(100).allow(null, 0),
                organization_id: Joi.number().integer().required(),
                dist: Joi.boolean().default(false),
                tasks: Joi.array().items(
                    Joi.object({
                        batalon_id: Joi.number().integer().min(1).required(),
                        task_time: Joi.number().min(1).required(),
                        worker_number: Joi.number().integer().min(1).required(),
                        task_date: Joi.string().trim().pattern(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/).allow('', null),
                        address: Joi.string().trim().required(),
                        bxm_id: Joi.number().integer().min(1).required()
                    })
                ).required().min(1)
            }),
            query: Joi.object({
                account_number_id: Joi.number().integer().min(1).required(),
            })
        })
    }
}