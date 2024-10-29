const { Router } = require("express");
const router = Router();

const protect = require("../middleware/auth");

const {
    workerTaskCreate,
    getBYTaskIdWorkerTask,
    workerTaskGetById,
    workerTaskUpdate,
    getByContractIdWorkerTask,
    workerTaskDelete
} = require('./worker.task.controller')

router.post('/',  protect, workerTaskCreate)
    .get('/task/:id', protect, getBYTaskIdWorkerTask)
    .get('/contract/:id', protect, getByContractIdWorkerTask)
    .put('/:id', protect, workerTaskUpdate)
    .get('/:id', protect, workerTaskGetById)
    .delete('/:id', protect, workerTaskDelete)

module.exports = router;