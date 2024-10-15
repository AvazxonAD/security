const { Router } = require("express");
const router = Router();

const protect = require("../../middleware/auth");

const {
    bossGet,
    bossUpdate
} = require('./boss.controller')

router.get('/', protect, bossGet)
    .put('/', protect, bossUpdate)

module.exports = router;