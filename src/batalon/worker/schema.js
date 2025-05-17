const Joi = require("joi");

exports.Schema = class {
  static createSchema() {
    return Joi.object({
      body: Joi.object({
        fio: Joi.string().trim().required(),
        batalon_id: Joi.number().min(1).integer().required(),
        account_number: Joi.string().trim().allow("", null),
        xisob_raqam: Joi.string().trim().allow("", null),
      }),
    }).options({ stripUnknown: true });
  }

  static updateSchema() {
    return Joi.object({
      body: Joi.object({
        fio: Joi.string().trim().required(),
        batalon_id: Joi.number().min(1).integer().required(),
        account_number: Joi.string().trim().allow("", null),
        xisob_raqam: Joi.string().trim().allow("", null),
      }),
      params: Joi.object({
        id: Joi.number().required().min(1).integer(),
      }),
    }).options({ stripUnknown: true });
  }

  static exportSchema() {
    return Joi.object({}).options({ stripUnknown: true });
  }

  static getById() {
    return Joi.object({
      params: Joi.object({
        id: Joi.number().required().min(1).integer(),
      }),
    }).options({ stripUnknown: true });
  }

  static delete() {
    return Joi.object({
      params: Joi.object({
        id: Joi.number().required().min(1).integer(),
      }),
    }).options({ stripUnknown: true });
  }

  static get() {
    return Joi.object({
      query: Joi.object({
        search: Joi.string().trim(),
        page: Joi.number().integer().default(1),
        limit: Joi.number().integer().default(15),
      }),
    }).options({ stripUnknown: true });
  }
};
