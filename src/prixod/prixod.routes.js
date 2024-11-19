const { Router } = require("express");
const router = Router();

const protect = require("../middleware/auth");

const {
    prixodCreate, 
    getPrixod, 
    getByIdPrixod,
    updatePrixod,
    deletePrixod,
    exportExcelData,
    forPdfData
} = require('./prxod.controller')

router.post('/', protect, prixodCreate)
    .get('/export', protect, exportExcelData)
    .get('/pdf', protect, forPdfData)
    .put('/:id', protect, updatePrixod)
    .get('/:id', protect, getByIdPrixod)
    .get('/', protect, getPrixod)
    .delete('/:id', protect, deletePrixod)

module.exports = router;