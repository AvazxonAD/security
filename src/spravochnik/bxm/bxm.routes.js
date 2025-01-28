const { Router } = require("express");
const router = Router();

const protect = require("../../middleware/auth");

const {
    bxmGet,
    bxmUpdate,
    getByIdBxm,
    createBxm
} = require('./controler')

router.put('/:id', protect, bxmUpdate)
    .get('/:id', protect, getByIdBxm)
    .post('/', protect, createBxm)
    .get('/', protect, bxmGet);

module.exports = router;