"use strict";

var _require = require("express"),
  Router = _require.Router;
var router = Router();
var protect = require("../../middleware/auth");
var _require2 = require('../../utils/protect.file'),
  uploadImage = _require2.uploadImage;
var _require3 = require('../../middleware/police.admin'),
  police = _require3.police;
var _require4 = require('./user.controller'),
  userCreate = _require4.userCreate,
  userGet = _require4.userGet,
  userGetById = _require4.userGetById,
  userUpdate = _require4.userUpdate,
  userDelete = _require4.userDelete;
router.post('/', protect, police(), uploadImage.single('file'), userCreate).put('/:id', protect, police(), uploadImage.single('file'), userUpdate).get('/:id', protect, police(), userGetById).get('/', protect, police(), userGet)["delete"]('/:id', protect, police(), userDelete);
module.exports = router;