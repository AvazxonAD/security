const bcrypt = require("bcrypt");
const { UsersService } = require("./service");
const { AuthService } = require(`../../auth/service`);
const { BatalonService } = require(`../../region/batalon/service`);

exports.Controller = class {
  static async create(req, res) {
    const { batalon_id, password, login } = req.body;
    const user_id = req.user.id;

    let url = null;
    if (req.file) {
      url = "/uploads/" + req.file.filename;
    }

    const check = await AuthService.getByLogin({ login });
    if (check) {
      return res.error(req.i18n.t("loginExists"), 400);
    }

    const batalon = await BatalonService.getById({
      id: batalon_id,
      user_id,
    });
    if (!batalon || batalon.birgada) {
      return res.error(req.i18n.t("batalonNotFound"), 404);
    }

    const check_batalon = await UsersService.getByBatalonId({
      user_id,
      batalon_id,
    });
    if (check_batalon) {
      return res.error(req.i18n.t("batalonUserExists"), 409);
    }

    const hash_password = await bcrypt.hash(password, 10);

    const result = await UsersService.create({
      ...req.body,
      user_id,
      password: hash_password,
      image: url,
    });

    return res.success(req.i18n.t("getSuccess"), 200, null, result);
  }

  static async get(req, res) {
    const user_id = req.user.id;
    const { page, limit } = req.query;

    const offset = (page - 1) * limit;

    const { data, total } = await UsersService.get({
      ...req.query,
      offset,
      user_id,
    });

    const pageCount = Math.ceil(total / limit);

    const meta = {
      pageCount: pageCount,
      count: total,
      currentPage: page,
      nextPage: page >= pageCount ? null : page + 1,
      backPage: page === 1 ? null : page - 1,
    };

    return res.success(req.i18n.t("getSuccess"), 200, meta, data);
  }

  static async getById(req, res) {
    const id = req.params.id;
    const user_id = req.user.id;

    const result = await UsersService.getById({ id, user_id });
    if (!result) {
      return res.error(req.i18n.t("userNotFound"), 404);
    }

    return res.success(req.i18n.t("getSuccess"), 200, null, result);
  }

  static async update(req, res) {
    const id = req.params.id;
    const user_id = req.user.id;
    const { login, password, batalon_id } = req.body;

    const old_data = await UsersService.getById({ id, user_id });
    if (!old_data) {
      return res.error(req.i18n.t("userNotFound"), 404);
    }

    if (login !== old_data.login) {
      const check = await AuthService.getByLogin({ login });
      if (check) {
        return res.error(req.i18n.t("loginExists"), 400);
      }
    }

    const batalon = await BatalonService.getById({
      id: batalon_id,
      user_id,
    });
    if (!batalon || batalon.birgada) {
      return res.error(req.i18n.t("batalonNotFound"), 404);
    }

    if (batalon_id !== old_data.batalon_id) {
      const check_batalon = await UsersService.getByBatalonId({
        user_id,
        batalon_id,
      });
      if (check_batalon) {
        return res.error(req.i18n.t("batalonUserExists"), 409);
      }
    }

    let url = null;
    if (req.file) {
      url = "/uploads/" + req.file.filename;
    } else {
      url = old_data.image;
    }

    const new_password = await bcrypt.hash(password, 10);

    const result = await UsersService.update({
      ...req.body,
      id,
      url,
      password: new_password,
    });

    return res.success(req.i18n.t("updateSuccess"), 200, null, result);
  }

  static async delete(req, res) {
    const id = req.params.id;

    const old_data = await UsersService.getById({ id, user_id });
    if (!old_data) {
      return res.error(req.i18n.t("userNotFound"), 404);
    }

    await UsersService.delete({ id });

    return res.success(req.i18n.t("deleteSuccess"), 200);
  }
};
