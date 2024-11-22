const { Router } = require("express");
const router = Router();

const protect = require("../middleware/auth");
const { uploadExcel } = require('../utils/protect.file')

const {
    contractCreate,
    contractGet,
    contractGetById,
    contractUpdate,
    contractDelete,
    importExcelData,
    exportExcelData,
    forDataPdf,
    contractView
} = require('./contract.controller')

router.post('/', protect, contractCreate)
    .get('/view/:id', protect, contractView)
    .get('/export', protect, exportExcelData)
    .get('/pdf', protect, forDataPdf)
    .put('/:id', protect, contractUpdate)
    .get('/:id', protect, contractGetById)
    .get('/', protect, contractGet)
    .delete('/:id', protect, contractDelete)
    .post('/excel', protect, uploadExcel.single('file'), importExcelData)


module.exports = router;