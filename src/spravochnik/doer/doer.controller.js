const {
    getdoerService,
    doerUpdateService
} = require("./doer.service");
const {  doerValidation } = require("../../utils/validation");
const { resFunc } = require("../../utils/resFunc");
const { validationResponse } = require("../../utils/response.validation");
const { errorCatch } = require('../../utils/errorCatch')

const doerGet = async (req, res) => {
    try {
        const user_id = req.user.id
        const result = await getdoerService(user_id)
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const doerUpdate = async (req, res) => {
    try {
        const user_id = req.user.id
        const { doer } = validationResponse(doerValidation, req.body)
        const result = await doerUpdateService(doer, user_id)
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

module.exports = {
    doerGet,
    doerUpdate
};
