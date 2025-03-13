"use strict";

var _require = require("express"),
  Router = _require.Router;
var router = Router();
var protect = require("../../middleware/auth");
var _require2 = require('./str.controller'),
  strGet = _require2.strGet,
  strUpdate = _require2.strUpdate;
router.get('/', protect, strGet).put('/', protect, strUpdate);
module.exports = router;