require('module-alias/register');

const dotenv = require("dotenv");
dotenv.config();
require('colors')
const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const { Db, db } = require('./db/index');
const i18next = require('./i18next');

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

        // const { Pool } = require('pg');
        // const pool = new Pool({
        //     host: 'localhost',
        //     user: 'postgres',
        //     port: 5432,
        //     database: 'milliy_gvardiya',
        //     password: 'avazbek+1201'
        // });
        // const olds = await pool.query(`
        //     SELECT * FROM contracts    
        // `)

        // const news = await db.query(`
        //     SELECT * FROM contract WHERE EXTRACT(YEAR FROM doc_date) = 2024   
        // `)

        // // console.log(news)
        // // console.log(olds.rows)

        // for (let n of news) {
        //     const _n = olds.rows.find(item => String(item.contractnumber) === n.doc_num);
        //     if (_n?.contractdate) {
        //         await db.query(`UPDATE contract SET doc_date = $1 WHERE id = $2`, [_n.contractdate, n.id])
        //     }
        // }

        app.listen(PORT, () => {
            console.log(`server runing on port: ${PORT}`.bgBlue)
        });
    } catch (error) {
        console.error(`Error db connect: error.message`.red);
        throw new Error(error);
    }
})();
