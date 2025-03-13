"use strict";

var _require = require("express"),
  Router = _require.Router;
var router = Router();
var protect = require("../middleware/auth");
var _require2 = require('../utils/protect.file'),
  uploadExcel = _require2.uploadExcel;
var _require3 = require('./controller'),
  contractCreate = _require3.contractCreate,
  contractGet = _require3.contractGet,
  contractGetById = _require3.contractGetById,
  contractUpdate = _require3.contractUpdate,
  contractDelete = _require3.contractDelete,
  exportExcelData = _require3.exportExcelData,
  contractView = _require3.contractView,
  importData = _require3.importData;
router.post('/', protect, contractCreate).post('/excel', protect, uploadExcel.single('file'), importData).get('/view/:id', protect, contractView).get('/export', protect, exportExcelData).put('/:id', protect, contractUpdate).get('/:id', protect, contractGetById).get('/', protect, contractGet)["delete"]('/:id', protect, contractDelete);
module.exports = router;