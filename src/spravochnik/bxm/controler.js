const { BxmService } = require('./service');


const Controller = class {
    static async deleteBxm(req, res) {
        const user_id = req.user.id;
        const id = req.params.id;

        const bxm = await BxmService.getByIdBxm({ id, user_id });
        if (!bxm) {
            return res.error('Bxm not found', 404);
        }

        return res.success()
    }
}









const {
    getbxmService,
    bxmUpdateService,
    getByIdBxmService,
    createBxmService
} = require("./db");
const { bxmValidation, getByIdBxmSchema } = require("../../utils/validation");
const { resFunc } = require("../../utils/resFunc");
const { validationResponse } = require("../../utils/response.validation");
const { errorCatch } = require('../../utils/errorCatch')

const bxmGet = async (req, res) => {
    try {
        const user_id = req.user.id
        const result = await getbxmService(user_id)
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

const createBxm = async (req, res) => {
    try {
        const user_id = req.user.id

        const { summa } = validationResponse(bxmValidation, req.body)

        const result = await createBxmService(user_id, summa);

        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const getByIdBxm = async (req, res) => {
    try {
        const user_id = req.user.id

        const { params } = validationResponse(getByIdBxmSchema, req);

        const bxm = await getByIdBxmService(user_id, params.id);

        resFunc(res, 200, bxm);
    } catch (error) {
        errorCatch(error, res);
    }
}

module.exports = {
    bxmGet,
    bxmUpdate,
    getByIdBxm,
    createBxm
};
