const { Router } = require("express");
const router = Router();

const protect = require("../../middleware/auth");
const { validator } = require('../../helper/validator');
const { BxmSchema } = require('./schema');
const {
    bxmGet,
    bxmUpdate,
    getByIdBxm,
    createBxm,
    Controller
} = require('./controler');

router.put('/:id', protect, bxmUpdate)
    .get('/:id', protect, getByIdBxm)
    .post('/', protect, createBxm)
    .delete('/:id', protect, validator(Controller.deleteBxm, BxmSchema.deleteSchema()))
    .get('/', protect, bxmGet);

module.exports = router;