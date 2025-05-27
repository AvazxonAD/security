const { Joi } = require(`@helper/validate`);

exports.WorkerTaskSchema = class {
  static create() {
    return Joi.object({
      body: Joi.object({
        workers: Joi.array()
          .min(1)
          .required()
          .items(
            Joi.object({
              task_time: Joi.number().min(0.1).required(),
              worker_id: Joi.number().integer().required(),
            }).required()
          ),
      }),

      query: Joi.object({
        task_id: Joi.number().min(1).integer().required(),
      }),
    });
  }

  static update() {
    return Joi.object({
      body: Joi.object({
        workers: Joi.array()
          .min(1)
          .required()
          .items(
            Joi.object({
              task_time: Joi.number().min(0.1).required(),
              worker_id: Joi.number().integer().required(),
            }).required()
          ),
      }),

      query: Joi.object({
        task_id: Joi.number().min(1).integer().required(),
      }),
    });
  }

  static get() {
    return Joi.object({
      query: Joi.object({
        task_id: Joi.number().min(1).integer().required(),
        excel: Joi.string().default("false").valid("true", "false"),
      }),
    });
  }

  static delete() {
    return Joi.object({
      query: Joi.object({
        task_id: Joi.number().min(1).integer().required(),
        worker_id: Joi.number().min(1).integer().required(),
      }),
    });
  }
};
