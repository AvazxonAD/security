const { Router } = require("express");
const router = Router();

const { Controller } = require("./controller");
const { validator } = require("@helper/validator");
const { BatalonTasksSchema } = require("./schema");

router.get("/", validator(Controller.get, BatalonTasksSchema.get()));

module.exports = router;
