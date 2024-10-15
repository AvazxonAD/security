const { Router } = require("express");
const router = Router();

const protect = require("../../middleware/auth");

const {
    account_numberCreate,
    account_numberGet,
    account_numberGetById,
    account_numberUpdate,
    account_numberDelete
} = require('./account.number.controller')

router.post('/', protect, account_numberCreate)
    .put('/:id', protect, account_numberUpdate)
    .get('/:id', protect, account_numberGetById)
    .get('/', protect, account_numberGet)
    .delete('/:id', protect, account_numberDelete)


module.exports = router;