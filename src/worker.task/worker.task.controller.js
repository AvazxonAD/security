const {
    workerTaskCreateService,
    deleteWorkerTaskService,
    getByTaskIdWorkerTaskService,
    getByContractIdWorkerTaskService,
    deleteBYTaskIdWorkerTask,
    getByTaskIdANDWorkerIdWorkerTaskService
} = require("./worker.task.service");
const { workerTaskValidation } = require("../utils/validation");
const { resFunc } = require("../utils/resFunc");
const { validationResponse } = require("../utils/response.validation");
const { errorCatch } = require('../utils/errorCatch');
const { getByIdTaskService } = require('../task/task.service');
const ErrorResponse = require("../utils/errorResponse");
const { getByBatalonIdAndIdWorkerService } = require('../worker/worker.service')
const { getByIdcontractService } = require('../contract/contract.service')

const workerTaskCreate = async (req, res) => {
    try {
        const user_id = req.user.id
        const task_id = req.query.task_id
        const { workers } = validationResponse(workerTaskValidation, req.body);
        const task = await getByIdTaskService(user_id, task_id, false, true)
        let all_task_time = 0
        for (let worker of workers) {
            await getByBatalonIdAndIdWorkerService(task.batalon_id, worker.worker_id)
            all_task_time += worker.task_time
        }
        if (all_task_time > task.remaining_task_time) {
            throw new ErrorResponse('You have entered more than the allowed time', 400)
        }
        const result = await workerTaskCreateService(task, workers);
        resFunc(res, 200, result);
    } catch (error) {
        errorCatch(error, res);
    }
};

const getBYTaskIdWorkerTask = async (req, res) => {
    try {
        const user_id = req.user.id
        const task_id = req.query.task_id
        await getByIdTaskService(user_id, task_id)
        const workers = await getByTaskIdWorkerTaskService(task_id)
        resFunc(res, 200, workers)
    } catch (error) {
        errorCatch(error, res)
    }
}

const workerTaskUpdate = async (req, res) => {
    try {
        const user_id = req.user.id
        const task_id = req.query.task_id;
        await getByIdTaskService(user_id, task_id)
        await deleteBYTaskIdWorkerTask(task_id)
        const task = await getByIdTaskService(user_id, task_id)
        const { workers } = validationResponse(workerTaskValidation, req.body);
        let all_task_time = 0
        for (let worker of workers) {
            await getByBatalonIdAndIdWorkerService(task.batalon_id, worker.worker_id)
            all_task_time += worker.task_time
        }
        if (all_task_time > task.remaining_task_time) {
            throw new ErrorResponse('You have entered more than the allowed time', 400)
        }
        const result = await workerTaskCreateService(task, workers, all_task_time);
        resFunc(res, 200, result);
    } catch (error) {
        errorCatch(error, res);
    }
};

const workerTaskDelete = async (req, res) => {
    try {
        const user_id = req.user.id
        const worker_id = req.query.worker_id;
        const task_id = req.query.task_id
        const task = await getByIdTaskService(user_id, task_id)
        await getByBatalonIdAndIdWorkerService(task.batalon_id, worker_id)
        await getByTaskIdANDWorkerIdWorkerTaskService(task_id, worker_id)
        await deleteWorkerTaskService(worker_id, task_id);
        resFunc(res, 200, 'delete success true');
    } catch (error) {
        errorCatch(error, res);
    }
};

const getByContractIdWorkerTask = async (req, res) => {
    try {
        const user_id = req.user.id
        const contract_id = req.params.id
        const account_number_id = req.query.account_number_id
        await getByIdcontractService(user_id, contract_id, false, account_number_id)
        const result = await getByContractIdWorkerTaskService(contract_id)
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

module.exports = {
    workerTaskCreate,
    workerTaskUpdate,
    workerTaskDelete,
    getBYTaskIdWorkerTask,
    getByContractIdWorkerTask
};
