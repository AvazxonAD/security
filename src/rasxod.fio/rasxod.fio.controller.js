const { paymentRequestValidation, rasxodFioValidation, rasxodQueryValidation } = require("../utils/validation");
const { resFunc } = require("../utils/resFunc");
const { validationResponse } = require("../utils/response.validation");
const { errorCatch } = require('../utils/errorCatch')
const { paymentRequestService, createRasxodDocService, getRasxodService, getByIdRasxodService, deeleteRasxodService, updateRasxodService } = require('./rasxod.fio.service')
const { getByIdaccount_numberService } = require('../spravochnik/accountNumber/account.number.service')
const { getByIdBatalonService } = require('../batalon/batalon.service')
const { getByIdWorkerTaskService } = require('./rasxod.fio.service')
const { returnStringSumma } = require('../utils/return.summa')
const { getByIddeductionService } = require('../spravochnik/deduction/deduction.service')

const getPaymentRequest = async (req, res) => {
    try {
        const user_id = req.user.id
        const { account_number_id, batalon_id, to, from } = validationResponse(paymentRequestValidation, req.query)
        await getByIdaccount_numberService(user_id, account_number_id)
        await getByIdBatalonService(user_id, batalon_id, false, true)
        const { data, itogo } = await paymentRequestService(account_number_id, batalon_id, from, to)
        return resFunc(res, 200, data, { itogo })
    } catch (error) {
        errorCatch(error, res)
    }
}

const createRasxod = async (req, res) => {
    try {
        const user_id = req.user.id
        const account_number_id = req.query.account_number_id
        const data = validationResponse(rasxodFioValidation, req.body)
        await getByIdaccount_numberService(user_id, account_number_id)
        await getByIdBatalonService(user_id, data.batalon_id, false, true)
        data.deductions = await Promise.all(data.deductions.map(async item => {
            const deduction = await getByIddeductionService(user_id, item.deduction_id)
            return deduction;
        }))
        for (let task of data.worker_tasks) {
            await getByIdWorkerTaskService(data.batalon_id, task.worker_task_id, user_id)
        }
        const result = await createRasxodDocService({ ...data, user_id, account_number_id })
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const getRasxod = async (req, res) => {
    try {
        const user_id = req.user.id
        const { from, to, account_number_id, page, limit, batalon_id } = validationResponse(rasxodQueryValidation, req.query)
        await getByIdaccount_numberService(user_id, account_number_id)
        if(batalon_id){
            await getByIdBatalonService(user_id, batalon_id, false)
        }
        const offset = (page - 1) * limit;
        const { total, data, summa_from, summa_to } = await getRasxodService(user_id, account_number_id, from, to, offset, limit, batalon_id)
        const pageCount = Math.ceil(total / limit);
        const meta = {
            pageCount: pageCount,
            count: total,
            currentPage: page,
            nextPage: page >= pageCount ? null : page + 1,
            backPage: page === 1 ? null : page - 1,
            from_balance: returnStringSumma(summa_from),
            to_balance: returnStringSumma(summa_to)
        }
        resFunc(res, 200, data, meta)
    } catch (error) {
        errorCatch(error, res)
    }
}

const getByIdRasxod = async (req, res) => {
    try {
        const user_id = req.user.id
        const account_number_id = req.query.account_number_id
        await getByIdaccount_numberService(user_id, account_number_id)
        const id = req.params.id
        const data = await getByIdRasxodService(user_id, account_number_id, id, true)
        resFunc(res, 200, data)
    } catch (error) {
        errorCatch(error, res)
    }
}

const deeleteRasxod = async (req, res) => {
    try {
        const user_id = req.user.id
        const account_number_id = req.query.account_number_id
        const id = req.params.id
        await getByIdRasxodService(user_id, account_number_id, id)
        await deeleteRasxodService(id)
        resFunc(res, 200, 'delete success true')
    } catch (error) {
        errorCatch(error, res)
    }
}

const updateRasxod = async (req, res) => {
    try {
        const user_id = req.user.id
        const account_number_id = req.query.account_number_id
        const id = req.params.id
        const oldData = await getByIdRasxodService(user_id, account_number_id, id)
        const data = validationResponse(rasxodFioValidation, req.body)
        await getByIdaccount_numberService(user_id, account_number_id)
        await getByIdBatalonService(user_id, data.batalon_id, false, true)
        for (let task of data.worker_tasks) {
            const test = oldData.worker_tasks.find(item => item.task_id === task.task_id)
            if (!test || oldData.batalon_id !== data.batalon_id) {
                await getByIdWorkerTaskService(data.batalon_id, task.task_id, user_id)
            }
        }
        data.deductions = await Promise.all(data.deductions.map(async item => {
            const deduction = await getByIddeductionService(user_id, item.deduction_id)
            return deduction;
        }))
        const result = await updateRasxodService({ ...data, id })
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}


module.exports = {
    getPaymentRequest,
    createRasxod,
    getRasxod,
    getByIdRasxod,
    deeleteRasxod,
    updateRasxod
}