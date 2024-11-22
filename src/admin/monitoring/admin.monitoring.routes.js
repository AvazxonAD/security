const { Router } = require("express");
const router = Router();

const protect = require("../../middleware/auth");

const {
    prixodRasxod,
    monitoring
} = require('./admin.monitoring.controller')

router.get('/', protect, monitoring)
router.get('/prixod/rasxod', protect, prixodRasxod)



module.exports = router;