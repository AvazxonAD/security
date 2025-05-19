const express = require("express");
const router = express.Router();
const protect = require("./middleware/auth");
const { Middleware } = require(`@middleware/index`);

// ROUTES IMPORTS
const authRoutes = require("./auth/auth.routes");
const batalonRoutes = require("./region/batalon/batalon.routes");
const bxmRoutes = require("./spravochnik/bxm/bxm.routes");
const accountRoutes = require("./spravochnik/account.number/account.number.routes");
const doerRoutes = require("./spravochnik/doer/doer.routes");
const bossRoutes = require("./spravochnik/boss/boss.routes");
const adressRoutes = require("./spravochnik/adress/adress.routes");
const bankRoutes = require("./spravochnik/bank/bank.routes");
const strRoutes = require("./spravochnik/str/str.routes");
const deductionRoutes = require("./spravochnik/deduction/deduction.routes");
const workerRoutes = require("./worker/index");
const organizationRoutes = require("./organization/organization.routes");
const contractRoutes = require("./contract/index");
const rasxodOrganRoutes = require("@rasxod_organ/index");
const workerTaskRoutes = require("./worker.task/worker.task.routes");
const taskRoutes = require("./task/task.routes");
const prixodRoutes = require("./prixod/prixod.routes");
const templateRoutes = require("./spravochnik/contract.shablon/contract.shablon.routes");
const rasxodFioRoutes = require("./rasxod.fio/rasxod.fio.routes");
const rasxodRoutes = require("./rasxod/rasxod.routes");
const monitoringRoutes = require("./monitoring/monitoring.routes");
const adminUserRoutes = require("./admin/user/user.routes");
const adminMonitoringRoutes = require("./admin/monitoring/admin.monitoring.routes");
const adminRegionRoutes = require("./admin/region/region.routes");
const regionUsers = require(`./region/users`);
const batalonWorker = require(`@batalon_worker/index`);
const batalonTasks = require(`@batalon_tasks/index`);

// BATALON ROUTES
router.use("/batalon/worker", protect, Middleware.checkBatalon, batalonWorker);
router.use("/batalon/tasks", protect, Middleware.checkBatalon, batalonTasks);
// REGION ROUTES
router.use("/auth", authRoutes);
router.use("/batalon", protect, batalonRoutes);
router.use("/bxm", protect, bxmRoutes);
router.use("/account", protect, accountRoutes);
router.use("/doer", protect, doerRoutes);
router.use("/boss", protect, bossRoutes);
router.use("/adress", protect, adressRoutes);
router.use("/bank", protect, bankRoutes);
router.use("/str", protect, strRoutes);
router.use("/deduction", protect, deductionRoutes);
router.use("/worker", protect, workerRoutes);
router.use("/organization", protect, organizationRoutes);
router.use("/contract", protect, contractRoutes);
router.use("/rasxod_organ", protect, rasxodOrganRoutes);
router.use("/worker_task", protect, workerTaskRoutes);
router.use("/task", protect, taskRoutes);
router.use("/prixod", protect, prixodRoutes);
router.use("/template", protect, templateRoutes);
router.use("/rasxod/fio", protect, rasxodFioRoutes);
router.use("/rasxod", protect, rasxodRoutes);
router.use("/monitoring", protect, monitoringRoutes);
router.use("/region/users", protect, regionUsers);
// ADMIN ROUTES
router.use("/admin/user", protect, adminUserRoutes);
router.use("/admin/monitoring", protect, adminMonitoringRoutes);
router.use("/admin/regions", protect, adminRegionRoutes);

module.exports = router;
