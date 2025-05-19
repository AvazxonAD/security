const { Router } = require("express");
const router = Router();

const protect = require(`@middleware/auth`);
const { validator } = require(`@helper/validator`);
const { Controller } = require("./controller");
const { WorkerTaskSchema } = require(`./schema`);

router
  .post("/", protect, validator(Controller.create, WorkerTaskSchema.create()))
  .get("/", protect, validator(Controller.get, WorkerTaskSchema.get()))
  .put("/", protect, validator(Controller.update, WorkerTaskSchema.update()))
  .delete(
    "/",
    protect,
    validator(Controller.delete, WorkerTaskSchema.delete())
  );

module.exports = router;
