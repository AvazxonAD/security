const { Router } = require("express");
const router = Router();

const protect = require("../middleware/auth");

const {
    pay, 
    getPayment, 
    getByIdPayment
} = require('./pay.controller')

router.post('/contract/:id', protect, pay)
    .put('/:id', protect, )
    .get('/:id', protect, getByIdPayment)
    .get('/', protect, getPayment)
    .delete('/:id', protect, )


module.exports = router;