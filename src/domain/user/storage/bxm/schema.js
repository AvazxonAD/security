const Joi = require('joi');

exports.BxmSchema = class {
    static deleteSchema() {
        return Joi.object({
            params: Joi.object({
                id: Joi.number().min(1).integer().required()
            })
        })
    }    
}