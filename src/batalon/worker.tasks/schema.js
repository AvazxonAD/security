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
    });
  }
};
