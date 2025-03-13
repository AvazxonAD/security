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
        const { error, value } = deductionValidation.validate(req.body);
        if (error) {
            return res.error(req.i18n.t('validationError'), 400);
        }

        await getBynamedeductionService(value.name, user_id, req.i18n)
        const result = await deductionCreateService({ ...value, user_id })
        
        return res.success(req.i18n.t('createSuccess'), 201, null, result);
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
        
        return res.success(req.i18n.t('getSuccess'), 200, meta, data);
    } catch (error) {
        errorCatch(error, res)
    }
}

const deductionGetById = async (req, res) => {
    try {
        const user_id = req.user.id
        const id = req.params.id
        const result = await getByIddeductionService(user_id, id, true, req.i18n)
        
        return res.success(req.i18n.t('getSuccess'), 200, null, result);
    } catch (error) {
        errorCatch(error, res)
    }
}

const deductionUpdate = async (req, res) => {
    try {
        const user_id = req.user.id
        const id = req.params.id

        const { error, value } = deductionValidation.validate(req.body);
        if (error) {
            return res.error(req.i18n.t('validationError'), 400);
        }

        const oldData = await getByIddeductionService(user_id, id, null, req.i18n)
        if (oldData.name !== value.name) {
            await getBynamedeductionService(value.name, user_id, req.i18n)
        }

        const result = await deductionUpdateService({ ...value, id });

        return res.success(req.i18n.t('updateSuccess'), 200, null, result);
    } catch (error) {
        errorCatch(error, res)
    }
}

const deductionDelete = async (req, res) => {
    try {
        const user_id = req.user.id
        const id = req.params.id
        await getByIddeductionService(user_id, id, null, req.i18n)
        await deletedeductionService(id)
        
        return res.success(req.i18n.t('deleteSuccess'), 200);
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
