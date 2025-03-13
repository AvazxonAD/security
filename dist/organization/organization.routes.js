"use strict";

var _require = require("express"),
  Router = _require.Router;
var router = Router();
var protect = require("../middleware/auth");
var _require2 = require('../utils/protect.file'),
  uploadExcel = _require2.uploadExcel;
var _require3 = require('./organization.controller'),
  organizationCreate = _require3.organizationCreate,
  organizationGet = _require3.organizationGet,
  organizationGetById = _require3.organizationGetById,
  organizationUpdate = _require3.organizationUpdate,
  organizationDelete = _require3.organizationDelete,
  excelDataOrganization = _require3.excelDataOrganization,
  forPdfData = _require3.forPdfData,
  importExcelData = _require3.importExcelData;
router.post('/', protect, organizationCreate).get('/excel', protect, excelDataOrganization).get('/pdf', protect, forPdfData).put('/:id', protect, organizationUpdate).get('/:id', protect, organizationGetById).get('/', protect, organizationGet)["delete"]('/:id', protect, organizationDelete).post('/import', protect, uploadExcel.single('file'), importExcelData);
module.exports = router;