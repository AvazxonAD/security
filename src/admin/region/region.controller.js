const {
    getRegionService
} = require("./region.service");
const { resFunc } = require("../../utils/resFunc");
const { errorCatch } = require('../../utils/errorCatch');

const getRegion = async (req, res) => {
    try {
        const data = await getRegionService()
        resFunc(res, 200, data)
    } catch (error) {
        errorCatch(error, res)
    }
}

module.exports = { getRegion }