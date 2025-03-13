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
        
        return res.success(req.i18n.t('getSuccess'), 200, null, result);
    } catch (error) {
        errorCatch(error, res);
    }
}

const userGet = async (req, res) => {
    try {
        const result = await getUserService()
        
        return res.success(req.i18n.t('getSuccess'), 200, null, data);
    } catch (error) {
        errorCatch(error, res)
    }
}

const userGetById = async (req, res) => {
    try {
        const id = req.params.id
        const result = await getByIdUserService(id, req.i18n)
        
        return res.success(req.i18n.t('getSuccess'), 200, null, result);
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
        
        return res.success(req.i18n.t('updateSuccess'), 200, null, result);
    } catch (error) {
        errorCatch(error, res)
    }
}

const userDelete = async (req, res) => {
    try {
        const id = req.params.id;
        await getByIdUserService(id, req.i18n);
        const delete_value = await deleteuserService(id);
        
        return res.success(req.i18n.t('deleteSuccess'), 200);
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
