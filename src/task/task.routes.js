const { Router } = require("express");
const router = Router();

const protect = require("../middleware/auth");

const {
    getByConrtactIdTask
} = require('../task/task.controller')

router.post('/',  protect, )
    .put('/:id', protect, )
    .get('/contract/:id', protect, getByConrtactIdTask)
    .get('/', protect, )
    .delete('/:id', protect, )


module.exports = router;