const { Router } = require("express");
const router = Router();

const protect = require("../middleware/auth");
const { uploadExcel } = require("../utils/protect.file");

const {
  contractCreate,
  contractGet,
  contractGetById,
  contractUpdate,
  contractDelete,
  exportExcelData,
  contractView,
  importData,
  Controller,
} = require("./controller");
const { ContractSchema } = require(`./schema`);
const { validator } = require(`@helper/validator`);

router
  .post("/", protect, contractCreate)
  .post("/excel", protect, uploadExcel.single("file"), importData)
  .get("/view/:id", protect, contractView)
  .get("/export", protect, exportExcelData)
  .get(
    "/export/batalon",
    protect,
    validator(
      Controller.getByBatalonReport,
      ContractSchema.getByBatalonReport()
    )
  )
  .put("/:id", protect, contractUpdate)
  .get("/:id", protect, contractGetById)
  .get("/", protect, contractGet)
  .delete("/:id", protect, contractDelete);

module.exports = router;
