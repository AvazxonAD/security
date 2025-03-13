"use strict";

var _require = require("express"),
  Router = _require.Router;
var router = Router();
var protect = require("../../middleware/auth");
var _require2 = require('./bank.controller'),
  bankGet = _require2.bankGet,
  bankUpdate = _require2.bankUpdate;
router.get('/', protect, bankGet).put('/', protect, bankUpdate);
module.exports = router;