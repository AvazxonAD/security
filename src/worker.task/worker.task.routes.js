const { Router } = require("express");
const router = Router();

const protect = require("../middleware/auth");

const {
    workerTaskCreate,
    getBYTaskIdWorkerTask,
    workerTaskGetById,
    workerTaskUpdate
} = require('./worker.task.controller')

router.post('/',  protect, workerTaskCreate)
    .get('/task/:id', protect, getBYTaskIdWorkerTask)
    .put('/:id', protect, workerTaskUpdate)
    .get('/:id', protect, workerTaskGetById)
    .get('/', protect, )
    .delete('/:id', protect, )


module.exports = router;