"use strict";

var _require = require("express"),
  Router = _require.Router;
var router = Router();
var protect = require("../middleware/auth");
var _require2 = require('./prxod.controller'),
  prixodCreate = _require2.prixodCreate,
  getPrixod = _require2.getPrixod,
  getByIdPrixod = _require2.getByIdPrixod,
  updatePrixod = _require2.updatePrixod,
  deletePrixod = _require2.deletePrixod,
  exportExcelData = _require2.exportExcelData,
  forPdfData = _require2.forPdfData;
router.post('/', protect, prixodCreate).get('/export', protect, exportExcelData).get('/pdf', protect, forPdfData).put('/:id', protect, updatePrixod).get('/:id', protect, getByIdPrixod).get('/', protect, getPrixod)["delete"]('/:id', protect, deletePrixod);
module.exports = router;