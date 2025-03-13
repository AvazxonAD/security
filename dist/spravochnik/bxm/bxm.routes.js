"use strict";

var _require = require("express"),
  Router = _require.Router;
var router = Router();
var protect = require("../../middleware/auth");
var _require2 = require('../../helper/validator'),
  validator = _require2.validator;
var _require3 = require('./schema'),
  BxmSchema = _require3.BxmSchema;
var _require4 = require('./controler'),
  bxmGet = _require4.bxmGet,
  bxmUpdate = _require4.bxmUpdate,
  getByIdBxm = _require4.getByIdBxm,
  createBxm = _require4.createBxm,
  Controller = _require4.Controller;
router.put('/:id', protect, bxmUpdate).get('/:id', protect, getByIdBxm).post('/', protect, createBxm)["delete"]('/:id', protect, validator(Controller.deleteBxm, BxmSchema.deleteSchema())).get('/', protect, bxmGet);
module.exports = router;