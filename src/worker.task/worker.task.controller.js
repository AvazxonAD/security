const {
    workerTaskCreateService,
    getWorkerTasksService,
    workerTaskUpdateService,
    deleteWorkerTaskService,
    getWorkerTaskByIdService,
} = require("./worker.task.service");
const { workerTaskValidation } = require("../utils/validation");
const { resFunc } = require("../utils/resFunc");
const { validationResponse } = require("../utils/response.validation");
const { errorCatch } = require('../utils/errorCatch');
const { getByIdTaskService } = require('../task/task.service');
const ErrorResponse = require("../utils/errorResponse");
const { getByBatalonIdAndIdWorkerService } = require('../worker/worker.service')

const workerTaskCreate = async (req, res) => {
    try {
        const { workers, task_id} = validationResponse(workerTaskValidation, req.body);
        const task = await getByIdTaskService(task_id)
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

const workerTaskGet = async (req, res) => {
    try {
        const user_id = req.user.id; // Agar user_id kerak bo'lsa
        const { page, limit } = req.query;
        const offset = (page - 1) * limit;
        const result = await getWorkerTasksService(user_id, offset, limit);

        const pageCount = Math.ceil(result.total / limit);
        const meta = {
            pageCount: pageCount,
            count: result.total,
            currentPage: page,
            nextPage: page >= pageCount ? null : page + 1,
            backPage: page === 1 ? null : page - 1
        };

        resFunc(res, 200, result.data, meta);
    } catch (error) {
        errorCatch(error, res);
    }
};

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
        const id = req.params.id;
        const { worker_id, task_id, summa } = validationResponse(workerTaskValidation, req.body);
        const result = await workerTaskUpdateService(id, worker_id, task_id, summa);
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
    workerTaskGet,
    workerTaskGetById,
    workerTaskUpdate,
    workerTaskDelete
};
