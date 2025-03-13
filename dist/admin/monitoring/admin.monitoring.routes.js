"use strict";

var _require = require("express"),
  Router = _require.Router;
var router = Router();
var _require2 = require('../../middleware/police.admin'),
  police = _require2.police;
var protect = require("../../middleware/auth");
var _require3 = require('./admin.monitoring.controller'),
  prixodRasxod = _require3.prixodRasxod,
  monitoring = _require3.monitoring;
router.get('/', protect, police(), monitoring);
router.get('/prixod/rasxod', protect, police(), prixodRasxod);
module.exports = router;