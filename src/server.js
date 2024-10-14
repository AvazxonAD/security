require('dotenv').config()
require('colors')
const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')

app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.use(cors())

app.use(express.static(path.join(__dirname, './public')));

app.use('/auth', require('./auth/auth.routes'))
app.use('/batalon', require('./batalon/batalon.routes'))
app.use('/bxm', require('./bxm/bxm.routes'))
app.use('/account', require('./accountNumber/account.number.routes'))

app.use(require('./middleware/errorHandler'))

const PORT = process.env.PORT || 3002

app.listen(PORT, () => {
    console.log(`server runing on port: ${PORT}`.bgBlue)
})