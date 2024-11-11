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
    exportRasxodByIdExcelData
} = require('./rasxod.fio.controller')

router.get('/request', protect, getPaymentRequest)
    .get('/export', protect, exportExcelData)
    .get('/export/:id', protect, exportRasxodByIdExcelData)
    .get('/:id', protect, getByIdRasxod)
    .get('/', protect, getRasxod)
    .post('/', protect, createRasxod)
    .put('/:id', protect, updateRasxod)
    .delete('/:id', protect, deeleteRasxod)

module.exports = router;