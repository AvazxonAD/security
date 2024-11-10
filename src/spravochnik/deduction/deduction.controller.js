const {
    deductionCreateService,
    getdeductionService,
    getByIddeductionService,
    deductionUpdateService,
    deletedeductionService,
    getBynamedeductionService,
} = require("./deduction.service");
const { deductionValidation, allQueryValidation } = require("../../utils/validation");
const { resFunc } = require("../../utils/resFunc");
const { validationResponse } = require("../../utils/response.validation");
const { errorCatch } = require('../../utils/errorCatch')
const ExcelJS = require('exceljs')
const path = require('path')

const deductionCreate = async (req, res) => {
    try {
        const user_id = req.user.id
        const data = validationResponse(deductionValidation, req.body)
        await getBynamedeductionService(data.name, user_id)
        const result = await deductionCreateService({ ...data, user_id })
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const deductionGet = async (req, res) => {
    try {
        const user_id = req.user.id
        const { page, limit, search } = validationResponse(allQueryValidation, req.query)
        const offset = (page - 1) * limit
        const { data, total } = await getdeductionService(user_id, search, offset, limit)
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

const deductionGetById = async (req, res) => {
    try {
        const user_id = req.user.id
        const id = req.params.id
        const result = await getByIddeductionService(user_id, id, true)
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const deductionUpdate = async (req, res) => {
    try {
        const user_id = req.user.id
        const id = req.params.id
        const data = validationResponse(deductionValidation, req.body)
        const oldData = await getByIddeductionService(user_id, id)
        if (oldData.name !== data.name) {
            await getBynamedeductionService(data.name, user_id)
        }
        const result = await deductionUpdateService({...data, id})
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const deductionDelete = async (req, res) => {
    try {
        const user_id = req.user.id
        const id = req.params.id
        await getByIddeductionService(user_id, id)
        await deletedeductionService(id)
        resFunc(res, 200, 'delete success true')
    } catch (error) {
        errorCatch(error, res)
    }
}

module.exports = {
    deductionCreate,
    deductionGet,
    deductionGetById,
    deductionUpdate,
    deductionDelete
};
