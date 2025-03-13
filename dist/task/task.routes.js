"use strict";

var _require = require("express"),
  Router = _require.Router;
var router = Router();
var protect = require("../middleware/auth");
var _require2 = require('../task/task.controller'),
  getByConrtactIdTask = _require2.getByConrtactIdTask,
  getByIdTask = _require2.getByIdTask,
  getTask = _require2.getTask;
router.get('/contract/:id', protect, getByConrtactIdTask).get('/:id', protect, getByIdTask).get('/', protect, getTask);
module.exports = router;