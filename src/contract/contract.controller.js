const {
    contractCreateService,
    getcontractService,
    getByIdcontractService,
    contractUpdateService,
    deletecontractService,
} = require("./contract.service");
const { contractValidation, conrtactQueryValidation } = require("../utils/validation");
const { resFunc } = require("../utils/resFunc");
const { validationResponse } = require("../utils/response.validation");
const { errorCatch } = require('../utils/errorCatch')
const { getByIdBatalonService } = require('../batalon/batalon.service')
const { getByIdorganizationService } = require('../organization/organization.service')
const { getByIdaccount_numberService } = require('../spravochnik/accountNumber/account.number.service')
const { getbxmService } = require('../spravochnik/bxm/bxm.service');
const { returnStringSumma } = require('../utils/return.summa')


const contractCreate = async (req, res) => {
    try {
        const user_id = req.user.id
        const data = validationResponse(contractValidation, req.body)
        const bxm = await getbxmService(user_id)
        await getByIdorganizationService(user_id, data.organization_id)
        await getByIdaccount_numberService(user_id, data.account_number_id)
        for (let task of data.tasks) {
            await getByIdBatalonService(user_id, task.batalon_id)
        }
        const result = await contractCreateService({ ...data, user_id, bxm })
        resFunc(res, 201, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const contractGet = async (req, res) => {
    try {
        const user_id = req.user.id
        const { page, limit, search, from, to } = validationResponse(conrtactQueryValidation, req.query)
        const offset = (page - 1) * limit
        const { data, total, from_balance, to_balance } = await getcontractService(user_id, offset, limit, search, from, to)
        const pageCount = Math.ceil(total / limit);
        const meta = {
            pageCount: pageCount,
            count: total,
            currentPage: page,
            nextPage: page >= pageCount ? null : page + 1,
            backPage: page === 1 ? null : page - 1,
            from_balance: returnStringSumma(from_balance),
            to_balance: returnStringSumma(to_balance)
        }
        resFunc(res, 200, data, meta)
    } catch (error) {
        errorCatch(error, res)
    }
}

const contractGetById = async (req, res) => {
    try {
        const user_id = req.user.id
        const id = req.params.id
        const result = await getByIdcontractService(user_id, id, true)
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const contractUpdate = async (req, res) => {
    try {
        const id = req.params.id
        const user_id = req.user.id
        await getByIdcontractService(user_id, id)
        const data = validationResponse(contractValidation, req.body)
        const bxm = await getbxmService(user_id)
        await getByIdorganizationService(user_id, data.organization_id)
        await getByIdaccount_numberService(user_id, data.account_number_id)
        for (let task of data.tasks) {
            await getByIdBatalonService(user_id, task.batalon_id)
        }
        const result = await contractUpdateService({ ...data, user_id, bxm, id })
        resFunc(res, 201, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const contractDelete = async (req, res) => {
    try {
        const user_id = req.user.id
        const id = req.params.id
        await getByIdcontractService(user_id, id)
        await deletecontractService(id)
        resFunc(res, 200, 'delete success true')
    } catch (error) {
        errorCatch(error, res)
    }
}

module.exports = {
    contractCreate,
    contractGet,
    contractGetById,
    contractUpdate,
    contractDelete
};
