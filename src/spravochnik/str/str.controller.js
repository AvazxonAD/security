const {
    getstrService,
    strUpdateService
} = require("./str.service");
const {  strValidation } = require("../../utils/validation");
const { resFunc } = require("../../utils/resFunc");
const { validationResponse } = require("../../utils/response.validation");
const { errorCatch } = require('../../utils/errorCatch')

const strGet = async (req, res) => {
    try {
        const user_id = req.user.id
        const result = await getstrService(user_id)
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const strUpdate = async (req, res) => {
    try {
        const user_id = req.user.id
        const { str } = validationResponse(strValidation, req.body)
        const result = await strUpdateService(str, user_id)
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

module.exports = {
    strGet,
    strUpdate
};
