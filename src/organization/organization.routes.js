const { Router } = require("express");
const router = Router();

const protect = require("../middleware/auth");

const {
    organizationCreate,
    organizationGet,
    organizationGetById,
    organizationUpdate,
    organizationDelete,
    excelDataOrganization,
    forPdfData
} = require('./organization.controller')

router.post('/', protect, organizationCreate)
    .get('/excel', protect, excelDataOrganization)
    .get('/pdf', protect, forPdfData)
    .put('/:id', protect, organizationUpdate)
    .get('/:id', protect, organizationGetById)
    .get('/', protect, organizationGet)
    .delete('/:id', protect, organizationDelete)


module.exports = router;