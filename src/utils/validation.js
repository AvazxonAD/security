const Joi = require("joi");

const deductionValidation = Joi.object({
  name: Joi.string().trim().required(),
  percent: Joi.number().required().min(1).max(100)
})

const rasxodValidation = Joi.object({
  doc_num: Joi.string().required().trim(),
  doc_date: Joi.string().trim().pattern(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/).required(),
  batalon_id: Joi.number().required().min(1),
  opisanie: Joi.string().trim(),
  tasks: Joi.array().items(
    Joi.object({
      task_id: Joi.number().integer().min(1).required()
    })
  ).required().min(1)
})

const rasxodFioValidation = Joi.object({
  doc_num: Joi.string().required().trim(),
  doc_date: Joi.string().trim().pattern(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/).required(),
  batalon_id: Joi.number().required().min(1),
  opisanie: Joi.string().trim(),
  worker_tasks: Joi.array().items(
    Joi.object({
      worker_task_id: Joi.number().integer().min(1).required()
    })
  ).required().min(1),
  deductions: Joi.array().items(
    Joi.object({
      deduction_id: Joi.number().integer().min(1).required()
    })
  )
})

const paymentRequestValidation = Joi.object({
  account_number_id: Joi.number().required().min(1),
  batalon_id: Joi.number().required().min(1),
  to: Joi.string().trim().pattern(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/).required(),
  from: Joi.string().trim().pattern(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/).required()
})

const loginValidation = Joi.object({
  login: Joi.string().trim().required(),
  password: Joi.string().trim().required().trim().required()
})
const authUpdateValidation = Joi.object({
  login: Joi.string().trim().required(),
  oldPassword: Joi.string().trim().required(),
  newPassword: Joi.string().trim().required(),
  fio: Joi.string().required().trim()
})
const batalionValidation = Joi.object({
  name: Joi.string().trim().required(),
  birgada: Joi.boolean(),
  address: Joi.string().trim().required(),
  str: Joi.string().trim().required(),
  bank_name: Joi.string().trim().required(),
  mfo: Joi.string().trim().required(),
  account_number: Joi.string().trim().required(),
  treasury1: Joi.string().trim(),
  treasury2: Joi.string().trim()
})
const bxmValidation = Joi.object({
  summa: Joi.number().required().min(1)
})
const accountNumberValidation = Joi.object({
  account_number: Joi.string().trim().required().pattern(/^\d+$/)
});
const doerValidation = Joi.object({
  doer: Joi.string().trim().required()
})
const bossValidation = Joi.object({
  boss: Joi.string().trim().required()
})
const adressValidation = Joi.object({
  adress: Joi.string().trim().required()
})
const bankValidation = Joi.object({
  bank: Joi.string().trim().required(),
  mfo: Joi.string().trim().required().pattern(/^\d+$/)
})
const strValidation = Joi.object({
  str: Joi.string().trim().required().length(9).pattern(/^\d+$/)
});
const workerValidation = Joi.object({
  fio: Joi.string().trim().required(),
  batalon_id: Joi.number().required(),
  account_number: Joi.string().trim().required().pattern(/^\d{16}$/),
  xisob_raqam: Joi.string().trim().required().pattern(/^\d{20}$/)
})
const organizationValidation = Joi.object({
  name: Joi.string().trim().required(),
  address: Joi.string().trim().required(),
  str: Joi.string().trim().required(),
  bank_name: Joi.string().trim().required(),
  mfo: Joi.string().trim().pattern(/^\d+$/).required(),
  account_number: Joi.string().trim().pattern(/^\d+$/).required(),
  treasury1: Joi.string().trim().pattern(/^\d+$/).allow(''),
  treasury2: Joi.string().trim().pattern(/^\d+$/).allow(''),
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
  start_time: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).allow(''),
  end_time: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).allow(''),
  discount: Joi.number().min(0).default(0).max(100),
  organization_id: Joi.number().integer().required(),
  tasks: Joi.array().items(
    Joi.object({
      batalon_id: Joi.number().integer().min(1).required(),
      task_time: Joi.number().integer().min(1).required(),
      worker_number: Joi.number().integer().min(1).required(),
      task_date: Joi.string().trim().pattern(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/).required()
    })
  ).required().min(1)
});


const prixodValidation = Joi.object({
  organization_id: Joi.number().integer().required().min(1),
  contract_id: Joi.number().integer().required().min(1),
  opisanie: Joi.string().allow(null, '').optional(),
  doc_dum: Joi.string().allow(null, '').optional(),
  doc_date: Joi.date().required(),
  summa: Joi.number().precision(2).min(1).required()
});

const workerTaskValidation = Joi.object({
  workers: Joi.array().items(
    Joi.object({
      task_time: Joi.number().min(0.1).required(),
      worker_id: Joi.number().integer().required()
    }).required()
  )
})

const workerTaskUpdateValidation = Joi.object({
  task_time: Joi.number().min(0.1).required(),
  worker_id: Joi.number().integer().required()
})

const conrtactQueryValidation = Joi.object({
  page: Joi.number().min(1).default(1),
  limit: Joi.number().min(1).default(10),
  search: Joi.string().trim(),
  from: Joi.string().trim().pattern(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/).required(),
  to: Joi.string().trim().pattern(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/).required(),
  account_number_id: Joi.number().min(1).required(),
  organization_id: Joi.number().min(1)
})

const rasxodQueryValidation = Joi.object({
  page: Joi.number().min(1).default(1),
  limit: Joi.number().min(1).default(10),
  from: Joi.string().trim().pattern(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/).required(),
  to: Joi.string().trim().pattern(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/).required(),
  account_number_id: Joi.number().min(1).required(),
  batalon_id: Joi.number().min(1)
})

const workerExcelValidation = Joi.object({
  FIO: Joi.string().trim().required(),
  Batalon: Joi.string().required().trim(),
  Karta_raqam: Joi.string().trim().required().pattern(/^\d{16}$/),
  Xisob_raqam: Joi.string().trim().required().pattern(/^\d{20}$/)
})

const prixodQueryValidation = Joi.object({
  page: Joi.number().min(1).default(1),
  limit: Joi.number().min(1).default(10),
  search: Joi.string().trim(),
  from: Joi.string().trim().pattern(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/).required(),
  to: Joi.string().trim().pattern(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/).required(),
  account_number_id: Joi.number().min(1).required()
})

const contractTemplateValidation = Joi.object({
  shablon_name: Joi.string().trim().max(200).required(),
  main_section: Joi.string().trim().required(),
  title: Joi.string().max(255).trim().required(),
  section_1: Joi.string().trim().required(),
  section_1_title: Joi.string().max(255).trim().required(),
  section_2: Joi.string().trim().required(),
  section_2_title: Joi.string().max(255).trim().required(),
  section_3: Joi.string().trim().required(),
  section_3_title: Joi.string().max(255).trim().required(),
  section_4: Joi.string().trim().required(),
  section_4_title: Joi.string().max(255).trim().required(),
  section_5: Joi.string().trim().required(),
  section_5_title: Joi.string().max(255).trim().required(),
  section_6: Joi.string().trim().required(),
  section_6_title: Joi.string().max(255).trim().required(),
  section_7: Joi.string().trim().required(),
  section_7_title: Joi.string().max(255).trim().required(),
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
  workerQueryValidation,
  contractValidation,
  prixodValidation,
  workerTaskValidation,
  workerTaskUpdateValidation,
  conrtactQueryValidation,
  workerExcelValidation,
  prixodQueryValidation,
  contractTemplateValidation,
  paymentRequestValidation,
  rasxodValidation,
  rasxodQueryValidation,
  rasxodFioValidation,
  deductionValidation
};