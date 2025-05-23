const {
  batalonCreateService,
  getBatalonService,
  getByIdBatalonService,
  batalonUpdateService,
  deleteBatalonService,
  getByNameBatalonService,
} = require("./db.js");
const { batalionValidation } = require("../../utils/validation");
const { validationResponse } = require("../../utils/response.validation");
const { errorCatch } = require("../../utils/errorCatch");

const batalonCreate = async (req, res) => {
  try {
    const user_id = req.user.id;
    const data = validationResponse(batalionValidation, req.body);
    await getByNameBatalonService(user_id, data.name, true, req.i18n);
    const result = await batalonCreateService({ user_id, ...data });

    return res.success(req.i18n.t("createSuccess"), 201, null, result);
  } catch (error) {
    errorCatch(error, res);
  }
};

const batalonGet = async (req, res) => {
  try {
    const user_id = req.user.id;
    const birgada = req.query.birgada;
    const result = await getBatalonService(user_id, birgada);

    return res.success(req.i18n.t("getSuccess"), 200, null, result.data);
  } catch (error) {
    errorCatch(error, res);
  }
};

const getById = async (req, res) => {
  try {
    const user_id = req.user.id;
    const id = req.params.id;
    const result = await getByIdBatalonService(
      user_id,
      id,
      null,
      null,
      req.i18n
    );

    return res.success(req.i18n.t("getSuccess"), 200, null, result);
  } catch (error) {
    errorCatch(error, res);
  }
};

const batalonUpdate = async (req, res) => {
  try {
    const user_id = req.user.id;
    const id = req.params.id;

    const data = validationResponse(batalionValidation, req.body);
    const old_data = await getByIdBatalonService(
      user_id,
      id,
      null,
      null,
      req.i18n
    );

    if (old_data.name !== data.name) {
      await getByNameBatalonService(user_id, data.name, true, req.i18n);
    }

    const result = await batalonUpdateService({
      ...req.body,
      old_data,
      id,
      account_number: req.body.account_number.replace(/\s+/g, ""),
    });

    return res.success(req.i18n.t("updateSuccess"), 200, null, result);
  } catch (error) {
    errorCatch(error, res);
  }
};

const batalonDelete = async (req, res) => {
  try {
    const user_id = req.user.id;
    const id = req.params.id;
    await getByIdBatalonService(user_id, id, null, null, req.i18n);
    await deleteBatalonService(id);

    return res.success(req.i18n.t("deleteSuccess"), 200);
  } catch (error) {
    errorCatch(error, res);
  }
};

module.exports = {
  batalonCreate,
  batalonGet,
  getById,
  batalonUpdate,
  batalonDelete,
};
