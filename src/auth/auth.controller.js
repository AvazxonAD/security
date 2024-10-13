const { getByLoginUserService, getBYIdUserService, updateAuthService } = require("./auth.service");
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
        const user = await getByLoginUserService(login);
        const matchPassword = await bcrypt.compare(password, user.password);
        if (!matchPassword) {
            throw new ErrorResponse("Incorrect login or password", 403)
        }
        delete user.password
        const token = generateToken(user);
        const data = { user, token }
        resFunc(res, 200, data);
    } catch (error) {
        errorCatch(error, res)
    }
}

// update
const update = async (req, res) => {
    try {
        const id = req.user.id
        const { login, oldPassword, newPassword } = validationResponse(authUpdateValidation, req.body)
        const user = await getBYIdUserService(id);
        const matchPassword = await bcrypt.compare(oldPassword, user.password);
        if (!matchPassword) {
            throw new ErrorResponse("Incorrect password", 403)
        }
        const newHashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = newHashedPassword;
        if (login) {
            if (login !== user.login) {
                const test = await getByLoginUserService(login);
                if (test) {
                    return next(new ErrorResponse("The login has already been used", 400));
                }
                user.login = login;
            }
        }
        const result = await updateAuthService(user.login, user.password, id);
        resFunc(res, 200, result)
    } catch (error) {
        errorCatch(error, res)
    }
}

module.exports = {
    login,
    update
};
