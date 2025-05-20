const { Router } = require("express");
const router = Router();

const protect = require("../middleware/auth");

const {
  getByConrtactIdTask,
  getByIdTask,
  getTask,
  updateDeadlineTask,
} = require("../task/task.controller");

router
  .get("/contract/:id", protect, getByConrtactIdTask)
  .get("/:id", protect, getByIdTask)
  .put("/:id", protect, updateDeadlineTask)
  .get("/", protect, getTask);

module.exports = router;
