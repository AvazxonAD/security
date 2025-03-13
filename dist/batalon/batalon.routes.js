"use strict";

var _require = require("express"),
  Router = _require.Router;
var router = Router();
var protect = require("../middleware/auth");
var _require2 = require('./batalon.controller'),
  batalonCreate = _require2.batalonCreate,
  batalonGet = _require2.batalonGet,
  getById = _require2.getById,
  batalonUpdate = _require2.batalonUpdate,
  batalonDelete = _require2.batalonDelete;
router.post('/', protect, batalonCreate).put('/:id', protect, batalonUpdate).get('/:id', protect, getById).get('/', protect, batalonGet)["delete"]('/:id', protect, batalonDelete);
module.exports = router;