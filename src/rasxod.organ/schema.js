exports.RasxodOrganSchema = class {
    static create() {
        return Joi.object({
            organization_id: Joi.number().integer().required().min(1),
            contract_id: Joi.number().integer().required().min(1),
            opisanie: Joi.string().allow(null, '').optional(),
            doc_num: Joi.string().required().pattern(/^\d+(\.\d+)?$/),
            doc_date: Joi.date().required(),
            summa: Joi.number().precision(2).min(1).required()
        })
    }
}