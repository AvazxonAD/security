const {
    account_numberCreateService,
    getaccount_numberService,
    getByIdaccount_numberService,
    account_numberUpdateService,
    deleteaccount_numberService,
    getByaccount_numberaccount_numberService
} = require("./account.number.service");
const { accountNumberValidation } = require("../utils/validation");
const { resFunc } = require("../utils/resFunc");
const { validationResponse } = require("../utils/response.validation");
const { errorCatch } = require('../utils/errorCatch')

const account_numberCreate = async (req, res) => {
    try {
        const user_id = req.user.id
        const { account_number } = validationResponse(accountNumberValidation, req.body)
        await getByaccount_numberaccount_numberService(user_id, account_number)
        const result = await account_numberCreateService(account_number, user_id)
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const account_numberGet = async (req, res) => {
    try {
        const user_id = req.user.id
        const result = await getaccount_numberService(user_id)
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const account_numberGetById = async (req, res) => {
    try {
        const user_id = req.user.id
        const id = req.params.id
        const result = await getByIdaccount_numberService(user_id, id, true)
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const account_numberUpdate = async (req, res) => {
    try {
        const user_id = req.user.id
        const id = req.params.id
        const { account_number } = validationResponse(accountNumberValidation, req.body)
        const oldvalue = await getByIdaccount_numberService(user_id, id)
        if (oldvalue.account_number !== account_number) {
            await getByaccount_numberaccount_numberService(user_id, account_number)
        }
        const result = await account_numberUpdateService(account_number, id)
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const account_numberDelete = async (req, res) => {
    try {
        const user_id = req.user.id
        const id = req.params.id
        await getByIdaccount_numberService(user_id, id)
        await deleteaccount_numberService(id)
        resFunc(res, 200, 'delete success true')
    } catch (error) {
        errorCatch(error, res)
    }
}

module.exports = {
    account_numberCreate,
    account_numberGet,
    account_numberGetById,
    account_numberUpdate,
    account_numberDelete
};
