const {
    batalonCreateService,
    getBatalonService,
    getByIdBatalonService,
    batalonUpdateService,
    deleteBatalonService,
    getByNameBatalonService
} = require("./batalon.service");
const { batalionValidation } = require("../utils/validation");
const { resFunc } = require("../utils/resFunc");
const { validationResponse } = require("../utils/response.validation");
const { errorCatch } = require('../utils/errorCatch')

const batalonCreate = async (req, res) => {
    try {
        const user_id = req.user.id
        const { name, birgada } = validationResponse(batalionValidation, req.body)
        await getByNameBatalonService(user_id, name)
        const result = await batalonCreateService(name, birgada, user_id)
        resFunc(res, 200,result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const batalonGet = async (req, res) => {
    try {
        const user_id = req.user.id
        const result = await getBatalonService(user_id)
        resFunc(res, 200,result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const batalonGetById = async (req, res) => {
    try {
        const user_id = req.user.id
        const id = req.params.id 
        const result = await getByIdBatalonService(user_id, id)
        resFunc(res, 200,result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const batalonUpdate = async (req, res) => {
    try {
        const user_id = req.user.id
        const id = req.params.id 
        const { name, birgada } = validationResponse(batalionValidation, req.body)
        const oldvalue = await getByIdBatalonService(user_id, id)
        if(oldvalue.name !== name){
            await getByNameBatalonService(user_id, name)
        }
        const result = await batalonUpdateService(name, birgada, id)
        resFunc(res, 200,result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const batalonDelete = async (req, res) => {
    try {
        const user_id = req.user.id
        const id = req.params.id 
        await getByIdBatalonService(user_id, id)
        await deleteBatalonService(id)
        resFunc(res, 200, 'delete success true')
    } catch (error) {
        errorCatch(error, res)
    }
}

module.exports = {
    batalonCreate,
    batalonGet,
    batalonGetById,
    batalonUpdate,
    batalonDelete
};
