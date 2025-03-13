const { Router } = require("express");
const router = Router();

const protect = require("../middleware/auth");

const {
  prixodCreate,
  getPrixod,
  getByIdPrixod,
  updatePrixod,
  deletePrixod,
  exportExcelData,
  forPdfData,
  Controler,
} = require("./prxod.controller");

const { uploadExcel } = require("../utils/protect.file");

router
  .post("/", protect, prixodCreate)
  .post("/import", protect, uploadExcel.single("file"), Controler.import)
  .get("/export", protect, exportExcelData)
  .get("/pdf", protect, forPdfData)
  .put("/:id", protect, updatePrixod)
  .get("/:id", protect, getByIdPrixod)
  .get("/", protect, getPrixod)
  .delete("/:id", protect, deletePrixod);

module.exports = router;
