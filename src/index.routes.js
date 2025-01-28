const express = require("express");
const router = express.Router();
const protect = require("./middleware/auth");

router.use('/auth', require('./auth/auth.routes'))
    .use('/batalon', protect, require('./batalon/batalon.routes'))
    .use('/bxm', protect, require('./spravochnik/bxm/routes'))
    .use('/account', protect, require('./spravochnik/accountNumber/account.number.routes'))
    .use('/doer', protect, require('./spravochnik/doer/doer.routes'))
    .use('/boss', protect, require('./spravochnik/boss/boss.routes'))
    .use('/adress', protect, require('./spravochnik/adress/adress.routes'))
    .use('/bank', protect, require('./spravochnik/bank/bank.routes'))
    .use('/str', protect, require('./spravochnik/str/str.routes'))
    .use('/deduction', protect, require('./spravochnik/deduction/deduction.routes'))
    .use('/worker', protect, require('./worker/index'))
    .use('/organization', protect, require('./organization/organization.routes'))
    .use('/contract', protect, require('./contract/contract.routes'))
    .use('/worker_task', protect, require('./worker.task/worker.task.routes'))
    .use('/task', protect, require('./task/task.routes'))
    .use('/prixod', protect, require('./prixod/prixod.routes'))
    .use('/template', protect, require('./spravochnik/contract.shablon/contract.shablon.routes'))
    .use('/rasxod/fio', protect, require('./rasxod.fio/rasxod.fio.routes'))
    .use('/rasxod', protect, require('./rasxod/rasxod.routes'))
    .use('/monitoring', protect, require('./monitoring/monitoring.routes'))
    .use('/admin/user', protect, require('./admin/user/user.routes'))
    .use('/admin/monitoring', protect, require('./admin/monitoring/admin.monitoring.routes'))
    .use('/admin/regions', protect, require('./admin/region/region.routes'));

module.exports = router;
