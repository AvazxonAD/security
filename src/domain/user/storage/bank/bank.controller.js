const {
    getbankService,
    bankUpdateService
} = require("./bank.service");
const { bankValidation } = require("../../utils/validation");
const { resFunc } = require("../../utils/resFunc");
const { validationResponse } = require("../../utils/response.validation");
const { errorCatch } = require('../../utils/errorCatch')

const bankGet = async (req, res) => {
    try {
        const user_id = req.user.id
        const result = await getbankService(user_id)
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const bankUpdate = async (req, res) => {
    try {
        const user_id = req.user.id
        const { bank, mfo } = validationResponse(bankValidation, req.body)
        const result = await bankUpdateService(bank, user_id, mfo)
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

module.exports = {
    bankGet,
    bankUpdate
};
