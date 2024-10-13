const {
    batalonCreateService,
    getBatalonService,
    getByIdBatalonService,
    batalonUpdateService,
    deleteBatalonService,
    getByNameBatalonService
} = require("./batalon.service");
const ErrorResponse = require("../utils/errorResponse");
const { batalionValidation } = require("../utils/validation");
const { resFunc } = require("../utils/resFunc");
const { validationResponse } = require("../utils/response.validation");
const { errorCatch } = require('../utils/errorCatch')

const batalonCreate = async (req, res) => {
    try {
        const user_id = req.user.id
        const { name, birgada } = validationResponse(batalionValidation, req.body)
        await getByNameBatalonService()
    } catch (error) {
        errorCatch(error, res)
    }
}


module.exports = {

};
