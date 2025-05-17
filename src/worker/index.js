const { Router } = require("express");
const router = Router();

const { uploadExcel } = require("../utils/protect.file");
const { Controller } = require("./controller");
const { validator } = require("../helper/validator");
const { Schema } = require("./schema");

router
  .post("/", validator(Controller.create, Schema.createSchema()))
  .get("/template", validator(Controller.WorkerTemplate))
  .get("/excel", validator(Controller.exportExcel, Schema.exportSchema()))
  .put(
    "/excel",
    uploadExcel.single("file"),
    validator(Controller.updateWorkerWithExcel)
  )
  .put("/:id", validator(Controller.update, Schema.updateSchema()))
  .get("/:id", validator(Controller.getById))
  .get("/", validator(Controller.get))
  .delete("/:id", validator(Controller.delete))
  .post("/excel", uploadExcel.single("file"), validator(Controller.importData));

module.exports = router;
