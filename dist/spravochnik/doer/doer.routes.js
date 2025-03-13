"use strict";

var _require = require("express"),
  Router = _require.Router;
var router = Router();
var protect = require("../../middleware/auth");
var _require2 = require('./doer.controller'),
  doerGet = _require2.doerGet,
  doerUpdate = _require2.doerUpdate;
router.get('/', protect, doerGet).put('/', protect, doerUpdate);
module.exports = router;