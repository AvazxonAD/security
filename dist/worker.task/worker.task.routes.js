"use strict";

var _require = require("express"),
  Router = _require.Router;
var router = Router();
var protect = require("../middleware/auth");
var _require2 = require('./worker.task.controller'),
  workerTaskCreate = _require2.workerTaskCreate,
  getBYTaskIdWorkerTask = _require2.getBYTaskIdWorkerTask,
  workerTaskUpdate = _require2.workerTaskUpdate,
  getByContractIdWorkerTask = _require2.getByContractIdWorkerTask,
  workerTaskDelete = _require2.workerTaskDelete;
router.post('/', protect, workerTaskCreate).get('/', protect, getBYTaskIdWorkerTask).get('/contract/:id', protect, getByContractIdWorkerTask).put('/', protect, workerTaskUpdate)["delete"]('/', protect, workerTaskDelete);
module.exports = router;