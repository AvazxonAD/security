const { Router } = require("express");
const router = Router();

const protect = require("../middleware/auth");
const { validator } = require('../helper/validator');
const { Controller } = require('./controller')
const { RasxodOrganSchema } = require('./schema');

router.post('/', protect, validator(Controller.create, RasxodOrganSchema.create()))
    .put('/:id', protect, validator(Controller.update, RasxodOrganSchema.update()))
    .get('/:id', protect, validator(Controller.getById, RasxodOrganSchema.getById()))
    .get('/', protect, validator(Controller.get, RasxodOrganSchema.get()))
    .delete('/:id', protect, validator(Controller.delete, RasxodOrganSchema.delete()))

module.exports = router;