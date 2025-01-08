const {
    getbxmService,
    bxmUpdateService
} = require("./bxm.service");
const { bxmValidation } = require("../../utils/validation");
const { resFunc } = require("../../utils/resFunc");
const { validationResponse } = require("../../utils/response.validation");
const { errorCatch } = require('../../utils/errorCatch')

const bxmGet = async (req, res) => {
    try {
        const user_id = req.user.id
        const result = await getbxmService(user_id)
        result.summa = Math.round((result.summa * 0.07) * 100) / 100;
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const bxmUpdate = async (req, res) => {
    try {
        const user_id = req.user.id
        const id = req.params.id
        const { summa } = validationResponse(bxmValidation, req.body)
        const result = await bxmUpdateService(summa, id, user_id)
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

module.exports = {
    bxmGet,
    bxmUpdate
};
