"use strict";

var _require = require("express"),
  Router = _require.Router;
var router = Router();
var protect = require("../middleware/auth");
var _require2 = require('./auth.controller'),
  login = _require2.login,
  update = _require2.update;
var _require3 = require('../utils/protect.file'),
  uploadImage = _require3.uploadImage;
router.post('/', login).patch('/', protect, uploadImage.single('file'), update);
module.exports = router;