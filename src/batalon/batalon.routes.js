const { Router } = require("express");
const router = Router();

const protect = require("../middleware/auth");

const {
  batalonCreate,
  batalonGet,
  getById,
  batalonUpdate,
  batalonDelete,
} = require("./batalon.controller");

router
  .post("/", protect, batalonCreate)
  .put("/:id", protect, batalonUpdate)
  .get("/:id", protect, getById)
  .get("/", protect, batalonGet)
  .delete("/:id", protect, batalonDelete);

module.exports = router;
