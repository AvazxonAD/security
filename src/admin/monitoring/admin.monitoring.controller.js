const {
  prixodRasxodService,
  monitoringService,
} = require("./admin.monitoring.service");
const {
  adminPrixodRasxodQueryValidation,
  adminMonitoringQueryValidation,
} = require("../../utils/validation");
const { resFunc } = require("../../utils/resFunc");
const { validationResponse } = require("../../utils/response.validation");
const { errorCatch } = require("../../utils/errorCatch");
const { returnStringSumma } = require("../../utils/return.summa");
const { getByIdUserService } = require("../user/user.service");
const { getByIdRegionService } = require("../region/region.service");

const prixodRasxod = async (req, res) => {
  try {
    const { from, to, page, limit, user_id } = validationResponse(
      adminPrixodRasxodQueryValidation,
      req.query
    );
    if (user_id) {
      await getByIdUserService(user_id, req.i18n);
    }
    const offset = (page - 1) * limit;
    const { rows, total, summa_from, summa_to, prixod, rasxod } =
      await prixodRasxodService(from, to, offset, limit, user_id);
    const pageCount = Math.ceil(total / limit);
    const meta = {
      pageCount: pageCount,
      count: total,
      currentPage: page,
      nextPage: page >= pageCount ? null : page + 1,
      backPage: page === 1 ? null : page - 1,
      from_balance: returnStringSumma(summa_from) || 0,
      to_balance: returnStringSumma(summa_to) || 0,
      prixod: returnStringSumma(prixod) || 0,
      rasxod: returnStringSumma(rasxod) || 0,
    };

    return res.success(req.i18n.t("getSuccess"), 200, meta, rows);
  } catch (error) {
    errorCatch(error, res);
  }
};

const monitoring = async (req, res) => {
  try {
    const { year, month, user_id } = validationResponse(
      adminMonitoringQueryValidation,
      req.query
    );
    if (user_id) {
      await getByIdRegionService(user_id);
    }
    const data = await monitoringService(year, month, user_id);

    return res.success(req.i18n.t("getSuccess"), 200, null, data);
  } catch (error) {
    errorCatch(error, res);
  }
};

module.exports = {
  prixodRasxod,
  monitoring,
};
