const { Router } = require("express");
const router = Router();

const protect = require("../../middleware/auth");

const {
    bxmGet,
    bxmUpdate
} = require('./bxm.controller')

router.put('/:id', protect, bxmUpdate)
    .get('/', protect, bxmGet)

module.exports = router;