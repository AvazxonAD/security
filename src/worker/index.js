const { Router } = require("express");
const router = Router();

const { uploadExcel } = require('../utils/protect.file');
const { Controller } = require('./controller');
const { validator } = require('../helper/validator');
const { Schema } = require('./schema');

router.post('/', validator(Controller.workerCreate, Schema.createSchema()))
    .get('/template', validator(Controller.WorkerTemplate))
    .get('/excel', validator(Controller.exportExcel, Schema.exportSchema()))
    .put('/:id', validator(Controller.workerUpdate, Schema.updateSchema()))
    .get('/:id', validator(Controller.workerGetById))
    .get('/', validator(Controller.workerGet))
    .delete('/:id', validator(Controller.workerDelete))
    .post('/excel', uploadExcel.single('file'), validator(Controller.importData));

module.exports = router;