const { Router } = require("express");
const router = Router();

const protect = require("../middleware/auth");

const {
    organizationCreate,
    organizationGet,
    organizationGetById,
    organizationUpdate,
    organizationDelete
} = require('./organization.controller')

router.post('/',  protect, organizationCreate)
    .put('/:id', protect, organizationUpdate)
    .get('/:id', protect, organizationGetById)
    .get('/', protect, organizationGet)
    .delete('/:id', protect, organizationDelete)


module.exports = router;