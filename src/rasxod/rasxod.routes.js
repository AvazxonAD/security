const { Router } = require("express");
const router = Router();

const protect = require("../middleware/auth");

const {
    getPaymentRequest,
    createRasxod,
    getRasxod,
    getByIdRasxod,
    deeleteRasxod,
    updateRasxod,
    exportExcelData,
    exportRasoxBYId,
    forPdfData
} = require('./rasxod.controller')

router.get('/request', protect, getPaymentRequest)
    .get('/export/:id', protect, exportRasoxBYId)
    .get('/export', protect, exportExcelData)
    .get('/pdf', protect, forPdfData)
    .get('/:id', protect, getByIdRasxod)
    .get('/', protect, getRasxod)
    .post('/', protect, createRasxod)
    .put('/:id', protect, updateRasxod)
    .delete('/:id', protect, deeleteRasxod)

module.exports = router;