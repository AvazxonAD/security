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
    exportExcelData,
    contractView,
    importData
} = require('./controller')

router.post('/', protect, contractCreate)
    .get('/view/:id', protect, contractView)
    .get('/export', protect, exportExcelData)
    .put('/:id', protect, contractUpdate)
    .get('/:id', protect, contractGetById)
    .get('/', protect, contractGet)
    .delete('/:id', protect, contractDelete)


module.exports = router;