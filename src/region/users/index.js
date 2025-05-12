const { Router } = require("express");
const router = Router();

const { uploadImage } = require("@helper/upload.js");
const { Controller } = require("./controller");
const { validator } = require("@helper/validator");
const { UserSchema } = require("./schena");

router
  .post(
    "/",
    uploadImage.single("file"),
    validator(Controller.create, UserSchema.create())
  )
  .put(
    "/:id",
    uploadImage.single("file"),
    validator(Controller.update, UserSchema.update())
  )
  .get("/:id", validator(Controller.getById, UserSchema.getById()))
  .get("/", validator(Controller.get, UserSchema.get()))
  .delete("/:id", validator(Controller.delete, UserSchema.delete()));

module.exports = router;
