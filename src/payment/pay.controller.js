const { paymentContractValidation, paymentQueryValidation } = require("../utils/validation");
const { resFunc } = require("../utils/resFunc");
const { validationResponse } = require("../utils/response.validation");
const { errorCatch } = require('../utils/errorCatch')
const ErrorResponse = require("../utils/errorResponse");
const { getByIdcontractService, updateContractPaymentService } = require('../contract/contract.service')
const { paymentContractService, getPaymentService, getByIdPayService } = require('./pay.service')
const { returnStringSumma } = require('../utils/return.summa')

const pay = async (req, res) => {
    try {
        const user_id = req.user.id;
        const contract_id = req.params.id;
        const data = validationResponse(paymentContractValidation, req.body);
        const contract = await getByIdcontractService(user_id, contract_id);
        if (contract.payment) {
            throw new ErrorResponse('You are overpaying for this contract', 400)
        }
        if (contract.remaining_balance < data.summa) {
            throw new ErrorResponse('You are overpaying for this contract', 400);
        }
        if ((contract.remaining_balance - data.summa) === 0) {
            await updateContractPaymentService(contract_id);
        }
        await paymentContractService(user_id, contract_id, data.summa, data.date)
        resFunc(res, 200, 'payment success true');
    } catch (error) {
        errorCatch(error, res);
    }
}

const getByIdPayment = async (req, res) => {
    try {
        const user_id = req.user.id 
        const id = req.params.id
        const data = getByIdPayService(user_id, id)
        resFunc(res, 200, data)
    } catch (error) {
        errorCatch(error, res)
    }
}

const getPayment = async (req, res) => {
    try {
        const user_id = req.user.id
        const { page, limit, search, from, to } = validationResponse(paymentQueryValidation, req.query)
        const offset = (page - 1) * limit
        const { data, total, from_balance, to_balance} = await getPaymentService(user_id, from, to, offset, limit, search)
        const pageCount = Math.ceil(total / limit);
        const meta = {
            pageCount: pageCount,
            count: total,
            currentPage: page,
            nextPage: page >= pageCount ? null : page + 1,
            backPage: page === 1 ? null : page - 1,
            from_balance: returnStringSumma(from_balance) || 0,
            to_balance: returnStringSumma(to_balance) || 0
        }
        resFunc(res, 200, data, meta)
    } catch (error) {
        errorCatch(error, res)
    }
}

module.exports = {
    pay,
    getPayment,
    getByIdPayment
}