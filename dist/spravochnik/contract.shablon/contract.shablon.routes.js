"use strict";

var _require = require("express"),
  Router = _require.Router;
var router = Router();
var protect = require("../../middleware/auth");
var _require2 = require('./contract.shablon.controller'),
  templateCreate = _require2.templateCreate,
  templateGet = _require2.templateGet,
  templateGetById = _require2.templateGetById,
  templateUpdate = _require2.templateUpdate,
  templateDelete = _require2.templateDelete;
router.post('/', protect, templateCreate).put('/:id', protect, templateUpdate).get('/:id', protect, templateGetById).get('/', protect, templateGet)["delete"]('/:id', protect, templateDelete);
module.exports = router;