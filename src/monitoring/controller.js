const { MonitoringService } = require('./service');

const {
    prixodRasxodService,
    monitoringService
} = require("./monitoring.service");
const { prixodRasxodQueryValidation, monitoringQueryValidation } = require("../utils/validation");
const { resFunc } = require("../utils/resFunc");
const { validationResponse } = require("../utils/response.validation");
const { errorCatch } = require('../utils/errorCatch')
const { getByIdaccount_numberService } = require('../spravochnik/account.number/account.number.service')
const { returnStringSumma } = require('../utils/return.summa')
const { getByIdBatalonService } = require('../batalon/db')

const prixodRasxod = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { account_number_id, from, to, page, limit, excel } = validationResponse(prixodRasxodQueryValidation, req.query)

        const offset = (page - 1) * limit;

        await getByIdaccount_numberService(user_id, account_number_id, null, req.i18n)

        const { docs, from_summa, to_summa, internal_summa } = await MonitoringService.get({ user_id, account_number_id, from, to, offset, limit })

        const pageCount = Math.ceil(docs.total / limit);

        const meta = {
            pageCount: pageCount,
            count: docs.total,
            currentPage: page,
            nextPage: page >= pageCount ? null : page + 1,
            backPage: page === 1 ? null : page - 1,
            from_balance: returnStringSumma(from_summa.summa) || 0,
            to_balance: returnStringSumma(to_summa.summa) || 0,
            prixod: returnStringSumma(internal_summa.prixod) || 0,
            rasxod: returnStringSumma(internal_summa.rasxod) || 0
        }

        return res.success(req.i18n.t('getSuccess'), 200, meta, docs.data);

    } catch (error) {
        errorCatch(error, res)
    }
}


const monitoring = async (req, res) => {
    try {
        const user_id = req.user.id
        const { year, month, batalon_id } = validationResponse(monitoringQueryValidation, req.query)
        if (batalon_id) {
            await getByIdBatalonService(user_id, batalon_id, null, null, req.i18n)
        }
        const data = await monitoringService(user_id, year, month, batalon_id)
        
        return res.success(req.i18n.t('getSuccess'), 200, null, data);
    } catch (error) {
        errorCatch(error, res)
    }
}


module.exports = {
    prixodRasxod,
    monitoring
}