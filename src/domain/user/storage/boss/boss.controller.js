const {
    getbossService,
    bossUpdateService
} = require("./boss.service");
const {  bossValidation } = require("../../utils/validation");
const { resFunc } = require("../../utils/resFunc");
const { validationResponse } = require("../../utils/response.validation");
const { errorCatch } = require('../../utils/errorCatch')

const bossGet = async (req, res) => {
    try {
        const user_id = req.user.id
        const result = await getbossService(user_id)
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const bossUpdate = async (req, res) => {
    try {
        const user_id = req.user.id
        const { boss } = validationResponse(bossValidation, req.body)
        const result = await bossUpdateService(boss, user_id)
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

module.exports = {
    bossGet,
    bossUpdate
};
