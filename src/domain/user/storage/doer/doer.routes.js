const { Router } = require("express");
const router = Router();

const protect = require("../../middleware/auth");

const {
    doerGet,
    doerUpdate
} = require('./doer.controller')

router.get('/', protect, doerGet)
    .put('/', protect, doerUpdate)

module.exports = router;