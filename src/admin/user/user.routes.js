const { Router } = require("express");
const router = Router();

const protect = require("../../middleware/auth");
const { uploadImage } = require('../../utils/protect.file')
const { police } = require('../../middleware/police.admin')

const {
    userCreate,
    userGet,
    userGetById,
    userUpdate,
    userDelete
} = require('./user.controller');

router.post('/', protect, police(), uploadImage.single('file'), userCreate)
    .put('/:id', protect, police(), uploadImage.single('file'), userUpdate)
    .get('/:id', protect, police(), userGetById)
    .get('/', protect, police(), userGet)
    .delete('/:id', protect, police(), userDelete);

module.exports = router;