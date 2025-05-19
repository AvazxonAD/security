const { Joi } = require(`@helper/validate`);

exports.BatalonTasksSchema = class {
  static get() {
    return Joi.object({
      query: Joi.object({
        page: Joi.number().min(1).integer().default(1),
        limit: Joi.number().min(1).integer().default(10),
        to: Joi.string()
          .trim()
          .pattern(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)
          .required(),
        from: Joi.string()
          .trim()
          .pattern(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)
          .required(),
        search: Joi.string().trim().allow(""),
        status: Joi.string()
          .trim()
          .allow("")
          .valid("done", "extended", "progress"),
      }),
    });
  }

  static getById() {
    return Joi.object({
      params: Joi.object({
        task_id: Joi.number().min(1).integer().required(),
      }),
    });
  }
};
