const { Router } = require("express");
const router = Router();

const protect = require("../middleware/auth");
const { uploadExcel } = require('../utils/protect.file')

const {
    organizationCreate,
    organizationGet,
    organizationGetById,
    organizationUpdate,
    organizationDelete,
    excelDataOrganization,
    forPdfData,
    importExcelData
} = require('./organization.controller')

router.post('/', protect, organizationCreate)
    .get('/excel', protect, excelDataOrganization)
    .get('/pdf', protect, forPdfData)
    .put('/:id', protect, organizationUpdate)
    .get('/:id', protect, organizationGetById)
    .get('/', protect, organizationGet)
    .delete('/:id', protect, organizationDelete)
    .post('/import', protect, uploadExcel.single('file'), importExcelData)

module.exports = router;