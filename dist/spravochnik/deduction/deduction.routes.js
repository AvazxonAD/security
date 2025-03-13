"use strict";

var _require = require("express"),
  Router = _require.Router;
var router = Router();
var protect = require("../../middleware/auth");
var _require2 = require('./deduction.controller'),
  deductionCreate = _require2.deductionCreate,
  deductionGet = _require2.deductionGet,
  deductionGetById = _require2.deductionGetById,
  deductionUpdate = _require2.deductionUpdate,
  deductionDelete = _require2.deductionDelete;
router.post('/', protect, deductionCreate).put('/:id', protect, deductionUpdate).get('/:id', protect, deductionGetById).get('/', protect, deductionGet)["delete"]('/:id', protect, deductionDelete);
module.exports = router;