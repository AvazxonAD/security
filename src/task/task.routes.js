const { Router } = require("express");
const router = Router();

const protect = require("../middleware/auth");

const {
} = require('../task/task.controller')

router.post('/',  protect, workerCreate)
    .put('/:id', protect, workerUpdate)
    .get('/:id', protect, workerGetById)
    .get('/', protect, workerGet)
    .delete('/:id', protect, workerDelete)


module.exports = router;