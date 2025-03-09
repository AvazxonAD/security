const {
    batalonCreateService,
    getBatalonService,
    getByIdBatalonService,
    batalonUpdateService,
    deleteBatalonService,
    getByNameBatalonService
} = require("./db.js");
const { batalionValidation } = require("../utils/validation");
const { resFunc } = require("../utils/resFunc");
const { validationResponse } = require("../utils/response.validation");
const { errorCatch } = require('../utils/errorCatch')

const batalonCreate = async (req, res) => {
    try {
        const user_id = req.user.id
        const data = validationResponse(batalionValidation, req.body)
        await getByNameBatalonService(user_id, data.name, true, req.i18n)
        const result = await batalonCreateService({ user_id, ...data })
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const batalonGet = async (req, res) => {
    try {
        const user_id = req.user.id
        const birgada = req.query.birgada
        const result = await getBatalonService(user_id, birgada)
        resFunc(res, 200, result.data)
    } catch (error) {
        errorCatch(error, res)
    }
}

const getById = async (req, res) => {
    try {
        const user_id = req.user.id
        const id = req.params.id
        const result = await getByIdBatalonService(user_id, id, null, null, req.i18n)
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const batalonUpdate = async (req, res) => {
    try {
        const user_id = req.user.id
        const id = req.params.id
        const { gazna_numbers, account_numbers } = req.body;

        const data = validationResponse(batalionValidation, req.body)
        const old_data = await getByIdBatalonService(user_id, id, null, null, req.i18n)

        if (old_data.name !== data.name) {
            await getByNameBatalonService(user_id, data.name, true, req.i18n)
        }

        for (let gazna of gazna_numbers) {
            if (gazna.id) {
                const check = old_data.gazna_numbers.find(item => item.id === gazna.id);
                if (!check) {
                    return res.error(req.i18n.t('gazna_not_found'), 404);
                }
            }
        }

        for (let acccount_number of account_numbers) {
            if (acccount_number.id) {
                const check = old_data.account_numbers.find(item => item.id === acccount_number.id);
                if (!check) {
                    return res.error(req.i18n.t('account_number_not_found'), 404);
                }
            }
        }

        const result = await batalonUpdateService({ ...data, old_data, id })

        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const batalonDelete = async (req, res) => {
    try {
        const user_id = req.user.id
        const id = req.params.id
        await getByIdBatalonService(user_id, id, null, null, req.i18n)
        await deleteBatalonService(id)
        resFunc(res, 200, 'delete success true')
    } catch (error) {
        errorCatch(error, res)
    }
}

module.exports = {
    batalonCreate,
    batalonGet,
    getById,
    batalonUpdate,
    batalonDelete
};
