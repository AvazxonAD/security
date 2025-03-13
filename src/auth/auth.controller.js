const { getByLoginUserService, getBYIdUserService, updateAuthService, getByLoginService } = require("./auth.service");
const bcrypt = require("bcrypt");
const ErrorResponse = require("../utils/errorResponse");
const generateToken = require("../utils/generate.token");
const { loginValidation, authUpdateValidation } = require("../utils/validation");
const { resFunc } = require("../utils/resFunc");
const { validationResponse } = require("../utils/response.validation");
const { errorCatch } = require('../utils/errorCatch')

// login
const login = async (req, res) => {
    try {
        const { login, password } = validationResponse(loginValidation, req.body)
        const user = await getByLoginUserService(login, req.i18n);
        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            throw new ErrorResponse(req.i18n.t('loginError'), 403)
        }
        delete user.password
        const token = generateToken(user);
        const data = { user, token };

        return res.success(req.i18n.t('login'), 200, null, data);
    } catch (error) {
        errorCatch(error, res)
    }
}

// update
const update = async (req, res) => {
    try {
        const id = req.user.id
        const { login, oldPassword, newPassword, fio } = validationResponse(authUpdateValidation, req.body)
        const user = await getBYIdUserService(id, req.i18n);
        if (oldPassword && newPassword) {
            const matchPassword = await bcrypt.compare(oldPassword, user.password);
            if (!matchPassword) {
                throw new ErrorResponse(req.i18n.t('passwordError'), 403)
            }
            const newHashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = newHashedPassword;
        }
        if (login) {
            if (login !== user.login) {
                await getByLoginService(login, req.i18n);
                user.login = login;
            }
        }
        if (req.file) {
            user.image = '/uploads/' + req.file.filename
        }
        if (fio) {
            user.fio = fio;
        }
        const result = await updateAuthService(user.login, user.password, user.fio, user.image, id);
        
        return res.success(req.i18n.t('updateSuccess'), 200, null, result);
    } catch (error) {
        errorCatch(error, res)
    }
}

module.exports = {
    login,
    update
};
