const { Router } = require("express");
const router = Router();

const protect = require("../../middleware/auth");

const {
    adressGet,
    adressUpdate
} = require('./adress.controller')

router.get('/', protect, adressGet)
    .put('/', protect, adressUpdate)

module.exports = router;