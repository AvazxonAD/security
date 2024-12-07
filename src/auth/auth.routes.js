const { Router } = require("express");
const router = Router();

const protect = require("../middleware/auth");

const { login, update } = require('./auth.controller')
const { uploadImage } = require('../utils/protect.file')

router.post('/', login)
    .patch('/', protect, uploadImage.single('file'), update)

module.exports = router;