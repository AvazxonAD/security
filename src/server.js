const dotenv = require("dotenv");
dotenv.config();
require('colors')
const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const { Db } = require('./db/index');
const i18next  = require('./i18next');

app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.use(cors())

app.use(express.static(path.join(__dirname, '../public')));

app.use(i18next, (req, res, next) => {
    req.i18n.changeLanguage(req.headers['x-app-lang']);

    next();
});

app.use(require('./middleware/response.metods'))

app.use(require('./index.routes'))


app.use('*', (req, res) => {
    res.error('Page not found', 404);
});

app.use(require('./middleware/errorHandler'));

const PORT = process.env.PORT || 3002;

(async () => {
    try {
        await Db.connectDB();
        console.log('Connect DB'.blue);
        app.listen(PORT, () => {
            console.log(`server runing on port: ${PORT}`.bgBlue)
        });
    } catch (error) {
        console.error(`Error db connect: error.message`.red);
        throw new Error(error);
    }
})();