const {
    userCreateService,
    getUserService,
    getByIdUserService,
    userUpdateService,
    deleteuserService,
    checkByRegionUser
} = require("./user.service");
const { userValidation } = require("../../utils/validation");
const { resFunc } = require("../../utils/resFunc");
const { validationResponse } = require("../../utils/response.validation");
const { errorCatch } = require('../../utils/errorCatch')
const { getByLoginService } = require('../../auth/auth.service')
const { getByIdRegionService } = require(`../region/region.service`)
const bcrypt = require('bcrypt')

const userCreate = async (req, res) => {
    try {
        let url = null;
        if (req.file) {
            url = '/uploads/' + req.file.filename
        }
        const data = validationResponse(userValidation, req.body);
        await getByLoginService(data.login, req.i18n);
        await getByIdRegionService(data.region_id)
        await checkByRegionUser(data.region_id, req.i18n)
        data.password = await bcrypt.hash(data.password, 10)
        const result = await userCreateService({ ...data, url });
        resFunc(res, 200, result);
    } catch (error) {
        errorCatch(error, res);
    }
}

const userGet = async (req, res) => {
    try {
        const result = await getUserService()
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const userGetById = async (req, res) => {
    try {
        const id = req.params.id
        const result = await getByIdUserService(id, req.i18n)
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const userUpdate = async (req, res) => {
    try {
        const id = req.params.id;
        const data = validationResponse(userValidation, req.body);
        let url = null;
        if (req.file) {
            url = '/uploads/' + req.file.filename
        }
        const oldData = await getByIdUserService(id, req.i18n);
        if (data.login !== oldData.login) {
            await getByLoginService(data.login, req.i18n)
        }
        if (data.region_id !== oldData.region_id) {
            await checkByRegionUser(data.region_id)
        }
        data.password = await bcrypt.hash(data.password, 10)
        const result = await userUpdateService({ ...data, id, url })
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

const userDelete = async (req, res) => {
    try {
        const id = req.params.id;
        await getByIdUserService(id, req.i18n);
        const delete_value = await deleteuserService(id);
        if (delete_value) {
            return resFunc(res, 200, 'delete success true');
        }
        return resFunc(res, 500, 'delete success false');
    } catch (error) {
        errorCatch(error, res)
    }
}

module.exports = {
    userCreate,
    userGet,
    userGetById,
    userUpdate,
    userDelete
};
