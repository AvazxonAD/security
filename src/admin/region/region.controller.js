const {
    getRegionService
} = require("./region.service");
const { resFunc } = require("../../utils/resFunc");
const { errorCatch } = require('../../utils/errorCatch');

const getRegion = async (req, res) => {
    try {
        const data = await getRegionService()
        
        return res.success(req.i18n.t('getSuccess'), 200, null, data);
    } catch (error) {
        errorCatch(error, res)
    }
}

module.exports = { getRegion }