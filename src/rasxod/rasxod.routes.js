const { Router } = require("express");
const router = Router();

const protect = require("../middleware/auth");

const {
    prixodCreate, 
    getPrixod, 
    getByIdPrixod,
    updatePrixod,
    deletePrixod
} = require('./rasxod.controller')

router.post('/', protect, prixodCreate)
    .put('/:id', protect, updatePrixod)
    .get('/:id', protect, getByIdPrixod)
    .get('/', protect, getPrixod)
    .delete('/:id', protect, deletePrixod)

module.exports = router;