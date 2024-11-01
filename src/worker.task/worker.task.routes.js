const { Router } = require("express");
const router = Router();

const protect = require("../middleware/auth");

const {
    workerTaskCreate,
    getBYTaskIdWorkerTask,
    workerTaskUpdate,
    getByContractIdWorkerTask,
    workerTaskDelete
} = require('./worker.task.controller')

router.post('/',  protect, workerTaskCreate)
    .get('/task/:id', protect, getBYTaskIdWorkerTask)
    .get('/contract/:id', protect, getByContractIdWorkerTask)
    .put('/', protect, workerTaskUpdate)
    .delete('/', protect, workerTaskDelete)

module.exports = router;