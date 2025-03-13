"use strict";

var _require = require("express"),
  Router = _require.Router;
var router = Router();
var protect = require("../middleware/auth");
var _require2 = require('./controller'),
  prixodRasxod = _require2.prixodRasxod,
  monitoring = _require2.monitoring;
router.get('/', protect, monitoring);
router.get('/prixod/rasxod', protect, prixodRasxod);
module.exports = router;