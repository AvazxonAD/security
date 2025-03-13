"use strict";

var _require = require("express"),
  Router = _require.Router;
var router = Router();
var protect = require("../middleware/auth");
var _require2 = require('../helper/validator'),
  validator = _require2.validator;
var _require3 = require('./controller'),
  Controller = _require3.Controller;
var _require4 = require('./schema'),
  RasxodOrganSchema = _require4.RasxodOrganSchema;
router.post('/', protect, validator(Controller.create, RasxodOrganSchema.create())).put('/:id', protect, validator(Controller.update, RasxodOrganSchema.update())).get('/:id', protect, validator(Controller.getById, RasxodOrganSchema.getById())).get('/', protect, validator(Controller.get, RasxodOrganSchema.get()))["delete"]('/:id', protect, validator(Controller["delete"], RasxodOrganSchema["delete"]()));
module.exports = router;