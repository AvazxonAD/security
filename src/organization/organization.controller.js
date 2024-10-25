const {
    organizationCreateService,
    getorganizationService,
    getByIdorganizationService,
    organizationUpdateService,
    deleteorganizationService,
    getByStrOrganizationService
} = require("./organization.service");
const { organizationValidation, allQueryValidation } = require("../utils/validation");
const { resFunc } = require("../utils/resFunc");
const { validationResponse } = require("../utils/response.validation");
const { errorCatch } = require('../utils/errorCatch')

const organizationCreate = async (req, res) => {
    try {
        const user_id = req.user.id
        const data = validationResponse(organizationValidation, req.body)
        await getByStrOrganizationService(data.str, user_id)
        const result = await organizationCreateService({ ...data, user_id })
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const organizationGet = async (req, res) => {
    try {
        const user_id = req.user.id
        const { page, limit, search } = validationResponse(allQueryValidation, req.query)
        const offset = (page - 1) * limit
        const { data, total } = await getorganizationService(user_id, search, offset, limit)
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

const organizationGetById = async (req, res) => {
    try {
        const user_id = req.user.id
        const id = req.params.id
        const result = await getByIdorganizationService(user_id, id, true)
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const organizationUpdate = async (req, res) => {
    try {
        const user_id = req.user.id
        const id = req.params.id
        const data = validationResponse(organizationValidation, req.body)
        const oldData = await getByIdorganizationService(user_id, id)
        if (oldData.str !== data.str) {
            await getByStrOrganizationService(data.str, user_id)
        }
        const result = await organizationUpdateService({...data, id})
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const organizationDelete = async (req, res) => {
    try {
        const user_id = req.user.id
        const id = req.params.id
        await getByIdorganizationService(user_id, id)
        await deleteorganizationService(id)
        resFunc(res, 200, 'delete success true')
    } catch (error) {
        errorCatch(error, res)
    }
}

module.exports = {
    organizationCreate,
    organizationGet,
    organizationGetById,
    organizationUpdate,
    organizationDelete
};
