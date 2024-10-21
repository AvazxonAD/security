const Joi = require("joi");

const loginValidation = Joi.object({
  login: Joi.string().trim().required().trim().required(),
  password: Joi.string().trim().required().trim().required()
})
const authUpdateValidation = Joi.object({
  login: Joi.string().trim().required().trim().required(),
  oldPassword: Joi.string().trim().required().trim().required(),
  newPassword: Joi.string().trim().required().trim().required()
})
const batalionValidation = Joi.object({
  name: Joi.string().trim().required().trim().required(),
  birgada: Joi.boolean()
})
const bxmValidation = Joi.object({
  summa: Joi.number().required().min(1)
})
const accountNumberValidation = Joi.object({
  account_number: Joi.string().trim().required().length(20).pattern(/^\d+$/).required()
});
const doerValidation = Joi.object({
  doer: Joi.string().trim().required().required()
})
const bossValidation = Joi.object({
  boss: Joi.string().trim().required().required()
})
const adressValidation = Joi.object({
  adress: Joi.string().trim().required().required()
})
const bankValidation = Joi.object({
  bank: Joi.string().trim().required().required(),
  mfo: Joi.string().trim().required().pattern(/^\d+$/).required()
})
const strValidation = Joi.object({
  str: Joi.string().trim().required().length(9).pattern(/^\d+$/).required()
});
const workerValidation = Joi.object({
  fio: Joi.string().trim().required().trim(),
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
const contractValidation = Joi.object({
  doc_num: Joi.string().trim().required(),
  doc_date: Joi.string().trim().pattern(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/).required(),
  period: Joi.string().trim().pattern(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/).required(),
  adress: Joi.string().trim().required(),
  start_date: Joi.string().trim().pattern(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/).required(),
  end_date: Joi.string().trim().pattern(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/).required(),
  start_time: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).required(),
  end_time: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).required(),
  discount: Joi.number().min(0).default(0),
  payment: Joi.boolean().required(),
  payment_date: Joi.string().trim().pattern(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/).required(),
  organization_id: Joi.number().integer().required(),
  account_number_id: Joi.number().integer().required(),
  tasks: Joi.array().items(
    Joi.object({
      batalon_id: Joi.number().integer().min(1).required(),
      task_time: Joi.number().integer().min(1).required(),
      worker_number: Joi.number().integer().min(1).required(),
      task_date: Joi.string().trim().pattern(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/).required()
    })
  ).required()
});

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
  workerQueryValidation,
  contractValidation
};