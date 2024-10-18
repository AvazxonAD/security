const Joi = require("joi");

// auth validation
const loginValidation = Joi.object({
  login: Joi.string().required().trim().required(),
  password: Joi.string().required().trim().required()
})
const authUpdateValidation = Joi.object({
  login: Joi.string().required().trim().required(),
  oldPassword: Joi.string().required().trim().required(),
  newPassword: Joi.string().required().trim().required()
})

// batalion validation 
const batalionValidation = Joi.object({
  name: Joi.string().required().trim().required(),
  birgada: Joi.boolean()
})

// spravochnik validation 
const bxmValidation = Joi.object({
  summa: Joi.number().required().min(1)
})
const accountNumberValidation = Joi.object({
  account_number: Joi.string().required().length(20).pattern(/^\d+$/).required()
});
const doerValidation = Joi.object({
  doer: Joi.string().required().required()
})
const bossValidation = Joi.object({
  boss: Joi.string().required().required()
})
const adressValidation = Joi.object({
  adress: Joi.string().required().required()
})
const bankValidation = Joi.object({
  bank: Joi.string().required().required(),
  mfo: Joi.string().required().pattern(/^\d+$/).required()
})
const strValidation = Joi.object({
  str: Joi.string().required().length(9).pattern(/^\d+$/).required()
});

// worker validation 
const workerValidation = Joi.object({
  fio: Joi.string().required().trim(),
  batalon_id: Joi.number().required(),
  account_number: Joi.string().trim().required().pattern(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/)
})

const organizationValidation = Joi.object({
    name: Joi.string().trim().required(),
    address: Joi.string().trim().required(),
    str: Joi.string().trim().required(),
    bank_name: Joi.string().trim().required(),
    mfo: Joi.string().trim().pattern(/^\d+$/).required(), 
    account_number: Joi.string().trim().pattern(/^\d+$/).required(),
    treasury1: Joi.string().trim().pattern(/^\d+$/).required(),
    treasury2: Joi.string().trim().pattern(/^\d+$/).required(),
});

const allQueryValidation = Joi.object({
  page: Joi.number().min(1).default(1),
  limit: Joi.number().min(1).default(10),
  search: Joi.string().trim()
})

const workerQueryValidation = Joi.object({
  page: Joi.number().min(1).default(1),
  limit: Joi.number().min(1).default(10),
  search: Joi.string().trim(),
  batalon_id: Joi.number().min(1)
})

module.exports = {
  authUpdateValidation,
  loginValidation,
  batalionValidation,
  bxmValidation,
  accountNumberValidation,
  doerValidation,
  bossValidation,
  adressValidation,
  bankValidation,
  strValidation,
  workerValidation,
  organizationValidation,
  allQueryValidation,
  workerQueryValidation
};