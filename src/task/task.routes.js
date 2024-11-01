const { Router } = require("express");
const router = Router();

const protect = require("../middleware/auth");

const {
    getByConrtactIdTask,
    getByIdTask
} = require('../task/task.controller')

router.get('/contract/:id', protect, getByConrtactIdTask)
    .get('/:id', protect, getByIdTask)
    

module.exports = router;