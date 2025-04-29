const Joi = require(`joi`);

exports.ContractSchema = class {
  static getByBatalonReport() {
    return Joi.object({
      query: Joi.object({
        account_number_id: Joi.number().integer().min(1).required(),
        batalon_id: Joi.number().integer().min(1).required(),
        excel: Joi.string().trim().default("true"),
        to: Joi.string()
          .trim()
          .pattern(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)
          .required(),
        from: Joi.string()
          .trim()
          .pattern(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)
          .required(),
      }),
    });
  }
};
