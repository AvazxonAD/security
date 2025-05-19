const { Router } = require("express");
const router = Router();

const { Controller } = require("./controller");
const { validator } = require("@helper/validator");
const { BatalonTasksSchema } = require("./schema");

router.get("/", validator(Controller.get, BatalonTasksSchema.get()));
router.get(
  "/:task_id",
  validator(Controller.getById, BatalonTasksSchema.getById())
);

module.exports = router;
