const {
    prixodRasxodService,
    monitoringService
} = require("./monitoring.service");
const { prixodRasxodQueryValidation, monitoringQueryValidation } = require("../utils/validation");
const { resFunc } = require("../utils/resFunc");
const { validationResponse } = require("../utils/response.validation");
const { errorCatch } = require('../utils/errorCatch')
const { getByIdaccount_numberService } = require('../spravochnik/accountNumber/account.number.service')
const { returnStringSumma } = require('../utils/return.summa')
const { getByIdBatalonService } = require('../batalon/db')

const prixodRasxod = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { account_number_id, from, to, page, limit } = validationResponse(prixodRasxodQueryValidation, req.query)
        const offset = (page - 1) * limit;
        await getByIdaccount_numberService(user_id, account_number_id)
        const { rows, total, summa_from, summa_to, prixod, rasxod } = await prixodRasxodService(user_id, account_number_id, from, to, offset, limit)
        const pageCount = Math.ceil(total / limit);
        const meta = {
            pageCount: pageCount,
            count: total,
            currentPage: page,
            nextPage: page >= pageCount ? null : page + 1,
            backPage: page === 1 ? null : page - 1,
            from_balance: returnStringSumma(summa_from) || 0,
            to_balance: returnStringSumma(summa_to) || 0,
            prixod: returnStringSumma(prixod) || 0,
            rasxod: returnStringSumma(rasxod) || 0
        }
        resFunc(res, 200, rows, meta)
    } catch (error) {
        errorCatch(error, res)
    }
}


const monitoring = async (req, res) => {
    try {
        const user_id = req.user.id
        const { year, month, batalon_id } = validationResponse(monitoringQueryValidation, req.query)
        if (batalon_id) {
            await getByIdBatalonService(user_id, batalon_id)
        }
        const data = await monitoringService(user_id, year, month, batalon_id)
        resFunc(res, 200, data)
    } catch (error) {
        errorCatch(error, res)
    }
}


module.exports = {
    prixodRasxod,
    monitoring
}