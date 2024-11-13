const { Router } = require("express");
const router = Router();

const protect = require("../middleware/auth");
const upload = require('../utils/protect.file')

const {
    workerCreate,
    workerGet,
    workerGetById,
    workerUpdate,
    workerDelete,
    excelDataWorker,
    importExcelData,
    downloadWorkersTemplate,
    forPdfData
} = require('./worker.controller')

router.post('/', protect, workerCreate)
    .get('/template', protect, downloadWorkersTemplate)
    .get('/excel', protect, excelDataWorker)
    .get('/pdf', protect, forPdfData)
    .put('/:id', protect, workerUpdate)
    .get('/:id', protect, workerGetById)
    .get('/', protect, workerGet)
    .delete('/:id', protect, workerDelete)
    .post('/excel', protect, upload.single('file'), importExcelData)
module.exports = router;