const { WorkerService } = require("@batalon_worker/service");
const { WorkerTaskService } = require("./service");
const { BatalonTasksService } = require(`@batalon_tasks/service`);

exports.Controller = class {
  static async get(req, res) {
    const { task_id, excel } = req.query;

    const task = await BatalonTasksService.getById({ id: task_id });
    if (!task) {
      return res.error(req.i18n.t("taskNotFound"), 404);
    }

    const result = await WorkerTaskService.get({ ...req.query });

    if (excel && excel === "true") {
      const { fileName, filePath } = await BatalonTasksService.getExcel({
        workers: result,
        task,
      });

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${fileName}"`
      );

      return res.sendFile(filePath);
    }

    return res.success(req.i18n.t("getSuccess"), 200, null, result);
  }

  static async create(req, res) {
    const batalon_id = req.user.batalon.id;
    const task_id = req.query.task_id;
    const { workers } = req.body;

    const task = await BatalonTasksService.getById({ id: task_id });
    if (!task) {
      return res.error(req.i18n.t("taskNotFound"), 404);
    }

    if (new Date(task.deadline) < new Date()) {
      return res.error(req.i18n.t("taskDeadline"), 400);
    }

    let all_task_time = 0;

    for (let worker of workers) {
      const checkWorker = await WorkerService.getById({
        batalon_id: batalon_id,
        id: worker.worker_id,
      });

      if (!checkWorker) {
        return res.error(req.i18n.t("workerNotFound"), 404);
      }

      all_task_time += worker.task_time;
    }

    if (all_task_time > task.remaining_task_time) {
      return res.error(req.i18n.t("taskTimeError"), 400);
    }

    await WorkerTaskService.create({
      ...req.body,
      ...req.query,
      task,
      user_id: req.user.id,
    });

    return res.success(req.i18n.t("createSuccess"), 201);
  }

  static async update(req, res) {
    const task_id = req.query.task_id;
    const { workers } = req.body;
    const batalon_id = req.user.batalon.id;

    const task = await BatalonTasksService.getById({ id: task_id });
    if (!task) {
      return res.error(req.i18n.t("taskNotFound"), 404);
    }

    if (new Date(task.deadline) < new Date()) {
      return res.error(req.i18n.t("taskDeadline"), 400);
    }

    let all_task_time = 0;
    for (let worker of workers) {
      const checkWorker = await WorkerService.getById({
        batalon_id: batalon_id,
        id: worker.worker_id,
      });

      if (!checkWorker) {
        return res.error(req.i18n.t("workerNotFound"), 404);
      }

      all_task_time += worker.task_time;
    }

    if (all_task_time > task.real_task_time) {
      return res.error(req.i18n.t("taskTimeError"), 400);
    }

    const check = await WorkerTaskService.checkDoc({ task_id });
    if (check.length) {
      return res.error(req.i18n.t("docExists"), 400, { docs: check });
    }

    await WorkerTaskService.update({
      ...req.body,
      ...req.query,
      task,
      user_id: req.user.id,
    });

    return res.success(req.i18n.t("updateSuccess"), 200);
  }

  static async delete(req, res) {
    const batalon_id = req.user.batalon.id;
    const { worker_id, task_id } = req.query;

    const task = await BatalonTasksService.getById({ id: task_id });
    if (!task) {
      return res.error(req.i18n.t("taskNotFound"), 404);
    }

    if (new Date(task.deadline) < new Date()) {
      return res.error(req.i18n.t("taskDeadline"), 400);
    }

    const checkWorker = await WorkerService.getById({
      batalon_id: batalon_id,
      id: worker_id,
    });
    if (!checkWorker) {
      return res.error(req.i18n.t("workerNotFound"), 404);
    }

    const check_task = await WorkerTaskService.get({
      task_id,
      worker_id,
      user_id: req.user.id,
    });

    if (!check_task.length) {
      return res.error(req.i18n.t("taskNotFound"), 404);
    }

    const check = await WorkerTaskService.checkDoc({ task_id });
    if (check.length) {
      return res.error(req.i18n.t("docExists"), 400, { docs: check });
    }

    await WorkerTaskService.delete({
      worker_id,
      task_id,
      user_id: req.user.id,
    });

    return res.success(req.i18n.t("deleteSuccess"), 200);
  }
};
