const Joi = require("joi");

exports.UserSchema = class {
  static create() {
    return Joi.object({
      body: Joi.object({
        fio: Joi.string().trim().required(),
        login: Joi.string().trim().max(100).required(),
        password: Joi.string().trim().max(100).required(),
        batalon_id: Joi.number().min(1).required(),
      }),
    });
  }

  static update() {
    return Joi.object({
      body: Joi.object({
        fio: Joi.string().trim().required(),
        login: Joi.string().trim().max(100).required(),
        password: Joi.string().trim().max(100).required(),
        batalon_id: Joi.number().min(1).required(),
      }),

      params: Joi.object({
        id: Joi.number().min(1).integer().required(),
      }),
    });
  }

  static getById() {
    return Joi.object({
      params: Joi.object({
        id: Joi.number().min(1).integer().required(),
      }),
    });
  }

  static delete() {
    return Joi.object({
      params: Joi.object({
        id: Joi.number().min(1).integer().required(),
      }),
    });
  }

  static get() {
    return Joi.object({
      query: Joi.object({
        page: Joi.number().min(1).default(1),
        limit: Joi.number().min(1).default(10),
        search: Joi.string(),
      }),
    });
  }
};
