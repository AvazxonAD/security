const { prixodValidation, prixodQueryValidation } = require("../utils/validation");
const { resFunc } = require("../utils/resFunc");
const { validationResponse } = require("../utils/response.validation");
const { errorCatch } = require('../utils/errorCatch')
const ErrorResponse = require("../utils/errorResponse");
const { getByIdcontractService  } = require('../contract/contract.service')
const { 
    prixodCreateService,
    getPrixodService,
    getByIdPrixodService,
    updatePrixodService,
    deletePrixodService
 } = require('./prixod.service')
const { returnStringSumma } = require('../utils/return.summa')
const { getByIdorganizationService } = require('../organization/organization.service')
const { getByIdaccount_numberService } = require('../spravochnik/accountNumber/account.number.service')

const prixodCreate = async (req, res) => {
    try {
        const user_id = req.user.id;
        const account_number_id = req.query.account_number_id;
        await getByIdaccount_numberService(user_id, account_number_id);
        const data = validationResponse(prixodValidation, req.body);
        await getByIdorganizationService(user_id, data.organization_id);
        const contract = await getByIdcontractService(user_id, data.contract_id, false, account_number_id, data.organization_id)
        if (contract.remaining_balance < data.summa) {
            throw new ErrorResponse('You are overpaying for this contract', 400);
        }
        const prixod = await prixodCreateService({...data, account_number_id, user_id})
        resFunc(res, 201, prixod);
    } catch (error) {
        errorCatch(error, res);
    }
}

const getByIdPrixod = async (req, res) => {
    try {
        const user_id = req.user.id
        const id = req.params.id
        const account_number_id = req.query.account_number_id;
        await getByIdaccount_numberService(user_id, account_number_id);
        const data = await getByIdPrixodService(user_id, id, account_number_id, true)
        resFunc(res, 200, data)
    } catch (error) {
        errorCatch(error, res)
    }
}

const getPrixod = async (req, res) => {
    try {
        const { page, limit, search, from, to, account_number_id } = validationResponse(prixodQueryValidation, req.query)
        const user_id = req.user.id;
        await getByIdaccount_numberService(user_id, account_number_id);
        const offset = (page - 1) * limit
        const { data, total, from_balance, to_balance } = await getPrixodService(user_id, from, to, offset, limit, account_number_id, search)
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


const updatePrixod = async (req, res) => {
    try {
        const user_id = req.user.id;
        const id = req.params.id;
        const account_number_id = req.query.account_number_id;
        const data = validationResponse(prixodValidation, req.body);
        const oldData = await getByIdPrixodService(user_id, id, account_number_id)
        await getByIdaccount_numberService(user_id, account_number_id);
        await getByIdorganizationService(user_id, data.organization_id);
        const contract = await getByIdcontractService(user_id, data.contract_id, false, account_number_id, data.organization_id)
        if (contract.remaining_balance + oldData.prixod_summa < data.summa) {
            throw new ErrorResponse('You are overpaying for this contract', 400);
        }
        const result =  await updatePrixodService({...data, id})
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const deletePrixod = async (req, res) => {
    try {
        const user_id = req.user.id
        const id = req.params.id
        const account_number_id = req.query.account_number_id;
        await getByIdaccount_numberService(user_id, account_number_id);
        await getByIdPrixodService(user_id, id, account_number_id, true)
        await deletePrixodService(id)
        resFunc(res, 200, 'Delete success true')
    } catch (error) {
        errorCatch(error, res)
    }
}

module.exports = {
    prixodCreate,
    getPrixod,
    getByIdPrixod,
    updatePrixod,
    deletePrixod
}