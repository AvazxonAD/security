const Joi = require("joi");

// auth validation
const loginValidation = Joi.object({
  login: Joi.string().trim().required(),
  password: Joi.string().trim().required()
})
const authUpdateValidation = Joi.object({
  login: Joi.string().trim().required(),
  oldPassword: Joi.string().trim().required(),
  newPassword: Joi.string().trim().required()
})

// batalion validation 
const batalionValidation = Joi.object({
  name: Joi.string().trim().required(),
  birgada: Joi.boolean()
})



module.exports = {
  authUpdateValidation,
  loginValidation,
  batalionValidation
};