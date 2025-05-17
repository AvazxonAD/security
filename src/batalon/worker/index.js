const { Router } = require("express");
const router = Router();

const { Controller } = require("./controller");
const { validator } = require("@helper/validator");
const { Schema } = require("./schema");

router
  .post("/", validator(Controller.create, Schema.createSchema()))
  .get("/excel", validator(Controller.exportExcel, Schema.exportSchema()))
  .put("/:id", validator(Controller.update, Schema.updateSchema()))
  .get("/:id", validator(Controller.getById, Schema.getById()))
  .get("/", validator(Controller.get, Schema.get()))
  .delete("/:id", validator(Controller.delete, Schema.delete()));

module.exports = router;
