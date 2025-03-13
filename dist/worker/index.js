"use strict";

var _require = require("express"),
  Router = _require.Router;
var router = Router();
var _require2 = require('../utils/protect.file'),
  uploadExcel = _require2.uploadExcel;
var _require3 = require('./controller'),
  Controller = _require3.Controller;
var _require4 = require('../helper/validator'),
  validator = _require4.validator;
var _require5 = require('./schema'),
  Schema = _require5.Schema;
router.post('/', validator(Controller.workerCreate, Schema.createSchema())).get('/template', validator(Controller.WorkerTemplate)).get('/excel', validator(Controller.exportExcel, Schema.exportSchema())).put('/:id', validator(Controller.workerUpdate, Schema.updateSchema())).get('/:id', validator(Controller.getById)).get('/', validator(Controller.workerGet))["delete"]('/:id', validator(Controller.workerDelete)).post('/excel', uploadExcel.single('file'), validator(Controller.importData));
module.exports = router;