const { Router } = require("express");
const router = Router();

const protect = require("../middleware/auth");

const {
    contractCreate,
    contractGet,
    contractGetById,
    contractUpdate,
    contractDelete,
    paymentContract
} = require('./contract.controller')

router.post('/', protect, contractCreate)
    .post('/pay/:id', protect, paymentContract)
    .put('/:id', protect, contractUpdate)
    .get('/:id', protect, contractGetById)
    .get('/', protect, contractGet)
    .delete('/:id', protect, contractDelete)


module.exports = router;