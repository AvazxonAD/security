const { Router } = require("express");
const router = Router();

const protect = require("../../middleware/auth");

const {
    templateCreate,
    templateGet,
    templateGetById,
    templateUpdate,
    templateDelete
} = require('./contract.shablon.controller')

router.post('/', protect, templateCreate)
    .put('/:id', protect, templateUpdate)
    .get('/:id', protect, templateGetById)
    .get('/', protect, templateGet)
    .delete('/:id', protect, templateDelete)


module.exports = router;