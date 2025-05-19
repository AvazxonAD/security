const { WorkerService } = require("@region_worker/service");
const { WorkerTaskService } = require("./service");

exports.Controller = class {
  static;
};
const workerTaskCreate = async (req, res) => {
  try {
    const user_id = req.user.id;
    const task_id = req.query.task_id;
    const { value, error } = workerTaskValidation.validate(req.body);
    if (error) {
      return res.error(req.i18n.t("validationError"), 400);
    }

    const task = await getByIdTaskService(
      user_id,
      task_id,
      false,
      true,
      req.i18n
    );
    let all_task_time = 0;

    for (let worker of value.workers) {
      const checkWorker = await WorkerService.getById({
        batalon_id: task.batalon_id,
        id: worker.worker_id,
        user_id,
      });
      if (!checkWorker) {
        return res.error(req.i18n.t("workerNotFound"), 404);
      }

      all_task_time += worker.task_time;
    }

    if (all_task_time > task.remaining_task_time) {
      throw new ErrorResponse(req.i18n.t("taskTimeError"), 400);
    }

    await deleteWorkerTaskService(task_id);

    const result = await workerTaskCreateService(task, value.workers);

    return res.success(req.i18n.t("createSuccess"), 200, null, result);
  } catch (error) {
    errorCatch(error, res);
  }
};

const getBYTaskIdWorkerTask = async (req, res) => {
  try {
    const user_id = req.user.id;
    const task_id = req.query.task_id;
    const search = req.query.search;
    await getByIdTaskService(user_id, task_id, null, null, req.i18n);
    const workers = await getByTaskIdWorkerTaskService(task_id, search);

    for (let worker of workers) {
      worker.summa = Math.round(worker.summa * 100) / 100;
      worker.task_time = Math.round(worker.task_time * 100) / 100;
    }

    return res.success(req.i18n.t("getSuccess"), 200, null, workers);
  } catch (error) {
    errorCatch(error, res);
  }
};

const workerTaskUpdate = async (req, res) => {
  try {
    const user_id = req.user.id;
    const task_id = req.query.task_id;
    const task = await getByIdTaskService(
      user_id,
      task_id,
      null,
      null,
      req.i18n
    );
    const { workers } = validationResponse(workerTaskValidation, req.body);
    let all_task_time = 0;
    for (let worker of workers) {
      const checkWorker = await WorkerService.getById({
        batalon_id: task.batalon_id,
        id: worker.worker_id,
        user_id,
      });
      if (!checkWorker) {
        return res.error(req.i18n.t("workerNotFound"), 404);
      }
      all_task_time += worker.task_time;
    }
    if (all_task_time > task.real_task_time) {
      throw new ErrorResponse(req.i18n.t("taskTimeError"), 400);
    }

    const check = await WorkerTaskService.checkDoc({ task_id });
    if (check.length) {
      return res.error(req.i18n.t("docExists"), 400, { docs: check });
    }

    await deleteByTaskIDWorkerTaskService(task_id);

    const result = await workerTaskCreateService(task, workers, all_task_time);

    return res.success(req.i18n.t("updateSuccess"), 200, null, result);
  } catch (error) {
    errorCatch(error, res);
  }
};

const workerTaskDelete = async (req, res) => {
  try {
    const user_id = req.user.id;
    const worker_id = req.query.worker_id;
    const task_id = req.query.task_id;
    const task = await getByIdTaskService(
      user_id,
      task_id,
      null,
      null,
      req.i18n
    );

    const checkWorker = await WorkerService.getById({
      batalon_id: task.batalon_id,
      id: worker_id,
      user_id,
    });
    if (!checkWorker) {
      return res.error(req.i18n.t("workerNotFound"), 404);
    }

    await getByTaskIdANDWorkerIdWorkerTaskService(task_id, worker_id, req.i18n);

    const check = await WorkerTaskService.checkDoc({ task_id });
    if (check.length) {
      return res.error(req.i18n.t("docExists"), 400, { docs: check });
    }

    await deleteWorkerTaskService(worker_id, task_id);

    return res.success(req.i18n.t("deleteSuccess"), 200);
  } catch (error) {
    errorCatch(error, res);
  }
};

const getByContractIdWorkerTask = async (req, res) => {
  try {
    const user_id = req.user.id;
    const contract_id = req.params.id;
    const account_number_id = req.query.account_number_id;
    await getByIdcontractService(
      user_id,
      contract_id,
      false,
      account_number_id,
      null,
      req.i18n
    );
    const result = await getByContractIdWorkerTaskService(contract_id);

    return res.success(req.i18n.t("getSuccess"), 200, null, result);
  } catch (error) {
    errorCatch(error, res);
  }
};
