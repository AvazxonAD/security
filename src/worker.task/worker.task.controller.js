const {
    workerTaskCreateService,
    deleteWorkerTaskService,
    getByTaskIdWorkerTaskService,
    getByContractIdWorkerTaskService,
    getBYWorkerIdWorkerTask,
    deleteBYTaskIdWorkerTask,
    getTaskTimeWorkerTaskService
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
        const task = await getByIdTaskService(user_id, task_id)
        let all_task_time = 0
        for (let worker of workers) {
            await getByBatalonIdAndIdWorkerService(task.batalon_id, worker.worker_id)
            all_task_time += worker.task_time
        }
        const remaining_task_time = await getTaskTimeWorkerTaskService(task_id)
        if (all_task_time > remaining_task_time) {
            throw new ErrorResponse('You have entered more than the allowed time', 400)
        }
        const result = await workerTaskCreateService(task, workers, all_task_time);
        resFunc(res, 200, result);
    } catch (error) {
        errorCatch(error, res);
    }
};

const getBYTaskIdWorkerTask = async (req, res) => {
    try {
        const task_id = req.params.id
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
        const old_task = await getByIdTaskService(user_id, task_id)
        const old_task_time = await getTaskTimeWorkerTaskService(task_id)
        await deleteBYTaskIdWorkerTask(old_task, old_task_time)
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
        const id = req.query.worker_id;
        const oldData = await getBYWorkerIdWorkerTask(id)
        const task = await getByIdTaskService(user_id, oldData.task_id)
        await deleteWorkerTaskService(id, task, oldData);
        resFunc(res, 200, 'delete success true');
    } catch (error) {
        errorCatch(error, res);
    }
};

const getByContractIdWorkerTask = async (req, res) => {
    try {
        const user_id = req.user.id
        const contract_id = req.params.id
        await getByIdcontractService(user_id, contract_id)
        const result = await getByContractIdWorkerTaskService(contract_id)
        if(!result){
            throw new ErrorResponse('this data not found', 404)
        }
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
