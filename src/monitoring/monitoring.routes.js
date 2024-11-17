const { Router } = require("express");
const router = Router();

const protect = require("../middleware/auth");

const {
    prixodRasxod
} = require('./monitoring.controller')

router.get('/prixod/rasxod', protect, prixodRasxod)


module.exports = router;