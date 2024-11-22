const {
    prixodRasxodService,
    monitoringService
} = require("./admin.monitoring.service");
const { adminPrixodRasxodQueryValidation, monitoringQueryValidation } = require("../../utils/validation");
const { resFunc } = require("../../utils/resFunc");
const { validationResponse } = require("../../utils/response.validation");
const { errorCatch } = require('../../utils/errorCatch')
const { returnStringSumma } = require('../../utils/return.summa')
const { getByIdUserService } = require('../user/user.service')

const prixodRasxod = async (req, res) => {
    try {
        const { from, to, page, limit, user_id } = validationResponse(adminPrixodRasxodQueryValidation, req.query)
        if(user_id){
            await getByIdUserService(user_id)
        }
        const offset = (page - 1) * limit;
        const { rows, total, summa_from, summa_to, prixod, rasxod } = await prixodRasxodService(from, to, offset, limit, user_id)
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
        const { year, month, account_number_id, batalon_id } = validationResponse(monitoringQueryValidation, req.query)
        if (batalon_id) {
            await getByIdBatalonService(user_id, batalon_id)
        }
        const data = await monitoringService(user_id, account_number_id, year, month, batalon_id)
        resFunc(res, 200, data)
    } catch (error) {
        errorCatch(error, res)
    }
}


module.exports = {
    prixodRasxod,
    monitoring
}