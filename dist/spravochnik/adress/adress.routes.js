"use strict";

var _require = require("express"),
  Router = _require.Router;
var router = Router();
var protect = require("../../middleware/auth");
var _require2 = require('./adress.controller'),
  adressGet = _require2.adressGet,
  adressUpdate = _require2.adressUpdate;
router.get('/', protect, adressGet).put('/', protect, adressUpdate);
module.exports = router;