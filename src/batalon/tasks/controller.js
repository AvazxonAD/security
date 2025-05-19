const { BatalonTasksService } = require(`./service`);

exports.Controller = class {
  static async get(req, res) {
    const { page, limit } = req.query;
    const batalon_id = req.user.batalon.id;

    const offset = (page - 1) * limit;

    const { data, total } = await BatalonTasksService.get({
      ...req.query,
      batalon_id,
      offset,
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
    const { task_id } = req.params;

    const data = await BatalonTasksService.getById({ id: task_id });

    if (!data) {
      return res.error(req.i18n.t("taskNotFound"), 404);
    }

    return res.success(req.i18n.t("getSuccess"), 200, null, data);
  }
};
