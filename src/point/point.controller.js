const { resFunc } = require("../utils/resFunc");
const { validationResponse } = require("../utils/response.validation");
const { errorCatch } = require('../utils/errorCatch');

const findPoint = async (req, res) => {
    try {
        
    } catch (error) {
        errorCatch(error, res)
    }
}

module.exports = { findPoint }