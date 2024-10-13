const { Router } = require("express");
const router = Router();

const protect = require("../middleware/auth");

const { login, update } = require('./auth.controller')

router.post('/', login)
    .patch('/', protect, update)

module.exports = router;