const { Router } = require("express");
const router = Router();

const protect = require("../../middleware/auth");
const { police } = require('../../middleware/police.admin')
const { getRegion } = require('./region.controller')


router.get('/', protect, police(), getRegion)

module.exports = router;