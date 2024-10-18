const {
    workerCreateService,
    getworkerService,
    getByIdworkerService,
    workerUpdateService,
    deleteworkerService,
    getByAcountNumberWorkerService
} = require("./worker.service");
const { workerValidation, workerQueryValidation } = require("../utils/validation");
const { getByIdBatalonService } = require('../batalon/batalon.service')
const { resFunc } = require("../utils/resFunc");
const { validationResponse } = require("../utils/response.validation");
const { errorCatch } = require('../utils/errorCatch')

const workerCreate = async (req, res) => {
    try {
        const user_id = req.user.id
        const { fio, batalon_id, account_number } = validationResponse(workerValidation, req.body)
        await getByIdBatalonService(user_id, batalon_id)
        await getByAcountNumberWorkerService(account_number)
        const result = await workerCreateService(fio, batalon_id, account_number)
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const workerGet = async (req, res) => {
    try {
        const user_id = req.user.id
        const { page, limit, batalon_id, search } = validationResponse(workerQueryValidation, req.query)
        const offset = (page - 1) * limit
        const { data, total } = await getworkerService(user_id, search, batalon_id, offset, limit)
        const pageCount = Math.ceil(total / limit);
        const meta = {
            pageCount: pageCount,
            count: total,
            currentPage: page,
            nextPage: page >= pageCount ? null : page + 1,
            backPage: page === 1 ? null : page - 1
        }
        resFunc(res, 200, data, meta)
    } catch (error) {
        errorCatch(error, res)
    }
}

const workerGetById = async (req, res) => {
    try {
        const user_id = req.user.id
        const id = req.params.id
        const result = await getByIdworkerService(user_id, id, true)
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const workerUpdate = async (req, res) => {
    try {
        const user_id = req.user.id
        const id = req.params.id
        const { fio, account_number, batalon_id } = validationResponse(workerValidation, req.body)
        const oldDate = await getByIdworkerService(user_id, id)
        if (oldDate.account_number !== account_number) {
            await getByAcountNumberWorkerService(account_number)
        }
        const result = await workerUpdateService(fio, batalon_id, account_number, id)
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const workerDelete = async (req, res) => {
    try {
        const user_id = req.user.id
        const id = req.params.id
        await getByIdworkerService(user_id, id)
        await deleteworkerService(id)
        resFunc(res, 200, 'delete success true')
    } catch (error) {
        errorCatch(error, res)
    }
}

module.exports = {
    workerCreate,
    workerGet,
    workerGetById,
    workerUpdate,
    workerDelete
};
