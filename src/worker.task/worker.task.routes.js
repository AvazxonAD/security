const { Router } = require("express");
const router = Router();

const protect = require("../middleware/auth");

const {
    workerTaskCreate
} = require('./worker.task.controller')

router.post('/',  protect, workerTaskCreate)
    .put('/:id', protect, )
    .get('/:id', protect, )
    .get('/', protect, )
    .delete('/:id', protect, )


module.exports = router;