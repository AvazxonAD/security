const { Router } = require("express");
const router = Router();

const protect = require("../middleware/auth");
const { validator } = require('../helper/validator');
const { Controller } = require('./controller')
const {} = require('./schema');

router.post('/', protect, Controller.create)
    .put('/:id', protect, Controller.update)
    .get('/:id', protect, Controller.getById)
    .get('/', protect, Controller.get)
    .delete('/:id', protect, Controller.delete)

module.exports = router;