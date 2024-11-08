const { Router } = require("express");
const router = Router();

const protect = require("../middleware/auth");

const {
    getPaymentRequest,
    createRasxod,
    getRasxod,
    getByIdRasxod,
    deeleteRasxod,
    updateRasxod
} = require('./rasxod.controller')

router.get('/request', protect, getPaymentRequest)
    .get('/:id', protect, getByIdRasxod)
    .get('/', protect, getRasxod)
    .post('/', protect, createRasxod)
    .put('/:id', protect, updateRasxod)
    .delete('/:id', protect, deeleteRasxod)

module.exports = router;