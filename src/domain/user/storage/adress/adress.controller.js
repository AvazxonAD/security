const {
    getadressService,
    adressUpdateService
} = require("./adress.service");
const {  adressValidation } = require("../../utils/validation");
const { resFunc } = require("../../utils/resFunc");
const { validationResponse } = require("../../utils/response.validation");
const { errorCatch } = require('../../utils/errorCatch')

const adressGet = async (req, res) => {
    try {
        const user_id = req.user.id
        const result = await getadressService(user_id)
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const adressUpdate = async (req, res) => {
    try {
        const user_id = req.user.id
        const { adress } = validationResponse(adressValidation, req.body)
        const result = await adressUpdateService(adress, user_id)
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

module.exports = {
    adressGet,
    adressUpdate
};
