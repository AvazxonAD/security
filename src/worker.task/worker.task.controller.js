const {
    workerTaskCreateService,
    workerTaskUpdateService,
    deleteWorkerTaskService,
    getWorkerTaskByIdService,
    getByTaskIdWorkerTaskService
} = require("./worker.task.service");
const { workerTaskValidation, workerTaskUpdateValidation } = require("../utils/validation");
const { resFunc } = require("../utils/resFunc");
const { validationResponse } = require("../utils/response.validation");
const { errorCatch } = require('../utils/errorCatch');
const { getByIdTaskService } = require('../task/task.service');
const ErrorResponse = require("../utils/errorResponse");
const { getByBatalonIdAndIdWorkerService } = require('../worker/worker.service')

const workerTaskCreate = async (req, res) => {
    try {
        const user_id = req.user.id 
        const { workers, task_id} = validationResponse(workerTaskValidation, req.body);
        const task = await getByIdTaskService(user_id, task_id)
        let all_task_time = 0
        for(let worker of workers){
            await getByBatalonIdAndIdWorkerService(task.batalon_id, worker.worker_id)
            all_task_time += worker.task_time
        }
        if(all_task_time > task.remaining_task_time){
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

const workerTaskGetById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await getWorkerTaskByIdService(id);
        resFunc(res, 200, result);
    } catch (error) {
        errorCatch(error, res);
    }
};

const workerTaskUpdate = async (req, res) => {
    try {
        const user_id = req.user.id
        const id = req.params.id;
        const oldData = await getWorkerTaskByIdService(id)
        const task = await getByIdTaskService(user_id, oldData.task_id, true)
        const { worker_id, task_time } = validationResponse(workerTaskUpdateValidation, req.body);
        await getByBatalonIdAndIdWorkerService(task.batalon_id, worker_id)
        if((task.remaining_task_time + oldData.task_time) < task_time){
            throw new ErrorResponse('You have entered more than the allowed time', 400)
        }
        const result = await workerTaskUpdateService(id, worker_id, task_time, task);
        resFunc(res, 200, result);
    } catch (error) {
        errorCatch(error, res);
    }
};

const workerTaskDelete = async (req, res) => {
    try {
        const id = req.params.id;
        await deleteWorkerTaskService(id);
        resFunc(res, 200, 'delete success true');
    } catch (error) {
        errorCatch(error, res);
    }
};

module.exports = {
    workerTaskCreate,
    workerTaskGetById,
    workerTaskUpdate,
    workerTaskDelete,
    getBYTaskIdWorkerTask
};
