"use strict";

var _require = require("express"),
  Router = _require.Router;
var router = Router();
var protect = require("../../middleware/auth");
var _require2 = require('../../middleware/police.admin'),
  police = _require2.police;
var _require3 = require('./region.controller'),
  getRegion = _require3.getRegion;
router.get('/', protect, police(), getRegion);
module.exports = router;