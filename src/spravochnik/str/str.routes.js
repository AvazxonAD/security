const { Router } = require("express");
const router = Router();

const protect = require("../../middleware/auth");

const {
    strGet,
    strUpdate
} = require('./str.controller')

router.get('/', protect, strGet)
    .put('/', protect, strUpdate)

module.exports = router;