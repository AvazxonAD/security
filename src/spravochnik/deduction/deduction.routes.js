const { Router } = require("express");
const router = Router();

const protect = require("../../middleware/auth");

const {
    deductionCreate,
    deductionGet,
    deductionGetById,
    deductionUpdate,
    deductionDelete
} = require('./deduction.controller')

router.post('/', protect, deductionCreate)
    .put('/:id', protect, deductionUpdate)
    .get('/:id', protect, deductionGetById)
    .get('/', protect, deductionGet)
    .delete('/:id', protect, deductionDelete)


module.exports = router;