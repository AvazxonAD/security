const { Router } = require("express");
const router = Router();

const protect = require("../../middleware/auth");

const {
    bankGet,
    bankUpdate
} = require('./bank.controller')

router.get('/', protect, bankGet)
    .put('/', protect, bankUpdate)

module.exports = router;