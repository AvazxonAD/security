const BaseJoi = require("joi");

exports.Joi = BaseJoi.defaults((schema) => {
  return schema.options({
    stripUnknown: true,
    abortEarly: false,
  });
});
