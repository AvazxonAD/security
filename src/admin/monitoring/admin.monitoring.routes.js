const { Router } = require("express");
const router = Router();

const { police } = require('../../middleware/police.admin')
const protect = require("../../middleware/auth");

const {
    prixodRasxod,
    monitoring
} = require('./admin.monitoring.controller')

router.get('/', protect, police(), monitoring)
router.get('/prixod/rasxod', protect, police(), prixodRasxod)



module.exports = router;