const { Router } = require("express");
const router = Router();

const protect = require("../middleware/auth");

const {
  getPaymentRequest,
  createRasxod,
  getRasxod,
  getByIdRasxod,
  deeleteRasxod,
  updateRasxod,
  exportExcelData,
  exportRasxodByIdExcelData,
  exportRasxodByIdExcelData2,
  forPdfData,
} = require("./rasxod.fio.controller");

router
  .get("/request", protect, getPaymentRequest)
  .get("/pdf", protect, forPdfData)
  .get("/:id", protect, getByIdRasxod)
  .get("/export", protect, exportExcelData)
  .get("/export/:id", protect, exportRasxodByIdExcelData2)
  .get("/", protect, getRasxod)
  .post("/", protect, createRasxod)
  .put("/:id", protect, updateRasxod)
  .delete("/:id", protect, deeleteRasxod);

module.exports = router;
