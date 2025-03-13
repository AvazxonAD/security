"use strict";

var _require = require("express"),
  Router = _require.Router;
var router = Router();
var protect = require("../middleware/auth");
var _require2 = require('./rasxod.fio.controller'),
  getPaymentRequest = _require2.getPaymentRequest,
  createRasxod = _require2.createRasxod,
  getRasxod = _require2.getRasxod,
  getByIdRasxod = _require2.getByIdRasxod,
  deeleteRasxod = _require2.deeleteRasxod,
  updateRasxod = _require2.updateRasxod,
  exportExcelData = _require2.exportExcelData,
  exportRasxodByIdExcelData = _require2.exportRasxodByIdExcelData,
  forPdfData = _require2.forPdfData;
router.get('/request', protect, getPaymentRequest).get('/pdf', protect, forPdfData).get('/:id', protect, getByIdRasxod).get('/export', protect, exportExcelData).get('/export/:id', protect, exportRasxodByIdExcelData).get('/', protect, getRasxod).post('/', protect, createRasxod).put('/:id', protect, updateRasxod)["delete"]('/:id', protect, deeleteRasxod);
module.exports = router;