"use strict";

var _require = require("express"),
  Router = _require.Router;
var router = Router();
var protect = require("../../middleware/auth");
var _require2 = require('./boss.controller'),
  bossGet = _require2.bossGet,
  bossUpdate = _require2.bossUpdate;
router.get('/', protect, bossGet).put('/', protect, bossUpdate);
module.exports = router;