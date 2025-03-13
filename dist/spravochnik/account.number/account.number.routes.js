"use strict";

var _require = require("express"),
  Router = _require.Router;
var router = Router();
var protect = require("../../middleware/auth");
var _require2 = require('./account.number.controller'),
  account_numberCreate = _require2.account_numberCreate,
  account_numberGet = _require2.account_numberGet,
  account_numberGetById = _require2.account_numberGetById,
  account_numberUpdate = _require2.account_numberUpdate,
  account_numberDelete = _require2.account_numberDelete;
router.post('/', protect, account_numberCreate).put('/:id', protect, account_numberUpdate).get('/:id', protect, account_numberGetById).get('/', protect, account_numberGet)["delete"]('/:id', protect, account_numberDelete);
module.exports = router;