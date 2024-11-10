require('dotenv').config()
require('colors')
const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')

app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use(cors())

app.use(express.static(path.join(__dirname, '../public')));

app.use('/auth', require('./auth/auth.routes'));
app.use('/batalon', require('./batalon/batalon.routes'));
app.use('/bxm', require('./spravochnik/bxm/bxm.routes'));
app.use('/account', require('./spravochnik/accountNumber/account.number.routes'));
app.use('/doer', require('./spravochnik/doer/doer.routes'));
app.use('/boss', require('./spravochnik/boss/boss.routes'));
app.use('/adress', require('./spravochnik/adress/adress.routes'));
app.use('/bank', require('./spravochnik/bank/bank.routes'));
app.use('/str', require('./spravochnik/str/str.routes'));
app.use('/deduction', require('./spravochnik/deduction/deduction.routes'));
app.use('/worker', require('./worker/worker.routes'));
app.use('/organization', require('./organization/organization.routes'));
app.use('/contract', require('./contract/contract.routes'));
app.use('/worker_task', require('./worker.task/worker.task.routes'));
app.use('/task', require('./task/task.routes'));
app.use('/prixod', require('./prixod/prixod.routes'));
app.use('/template', require('./spravochnik/contract.shablon/contract.shablon.routes'));
app.use('/rasxod/fio', require('./rasxod.fio/rasxod.fio.routes'));
app.use('/rasxod', require('./rasxod/rasxod.routes'));

app.use(require('./middleware/errorHandler'));

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`server runing on port: ${PORT}`.bgBlue)
});