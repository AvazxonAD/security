const { WorkerService } = require("./service");
const { BatalonService } = require("@batalon/service");

exports.Controller = class {
  static async create(req, res) {
    const batalon_id = req.user.batalon.id;
    const user_id = req.user.batalon.user_id;
    const { fio, account_number, xisob_raqam } = req.body;

    if (account_number) {
      const check = await WorkerService.getByAccountNumber({
        user_id,
        account_number,
      });
      if (check) {
        return res.error(req.i18n.t("accountNumberExists"), 409);
      }
    }

    if (xisob_raqam) {
      const check = await WorkerService.getByXisobNumber({
        user_id,
        xisob_raqam,
      });
      if (check) {
        return res.error(req.i18n.t("accountNumberExists"), 409);
      }
    }

    const check = await WorkerService.getByFio({ user_id, fio });
    if (check) {
      return res.error(req.i18n.t("fioExists"), 409);
    }

    await WorkerService.create({
      ...req.body,
      batalon_id,
      user_id,
    });

    return res.success(req.i18n.t("createSuccess"), 201);
  }

  static async get(req, res) {
    const user_id = req.user.batalon.user_id;
    const batalon_id = req.user.batalon.id;
    const { page, limit, search } = req.query;

    const offset = (page - 1) * limit;

    const { data, total } = await WorkerService.get({
      user_id,
      search,
      batalon_id,
      offset,
      limit,
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
    const batalon_id = req.user.batalon.id;
    const id = req.params.id;

    const result = await WorkerService.getById({
      batalon_id,
      id,
      isdeleted: true,
    });

    if (!result) {
      return res.error(req.i18n.t("workerNotFound"), 404);
    }

    return res.success(req.i18n.t("getSuccess"), 200, null, result);
  }

  static async update(req, res) {
    const batalon_id = req.user.batalon.id;
    const user_id = req.user.batalon.user_id;
    const id = req.params.id;
    const { fio, account_number, xisob_raqam } = req.body;

    const oldData = await WorkerService.getById({ batalon_id, id });
    if (!oldData) {
      return res.error(req.i18n.t("workerNotFound"), 404);
    }

    if (account_number) {
      if (oldData.account_number !== account_number) {
        const check = await WorkerService.getByAccountNumber({
          user_id,
          account_number,
        });
        if (check) {
          return res.error(req.i18n.t("accountNumberExists"), 409);
        }
      }
    }

    if (xisob_raqam) {
      if (oldData.xisob_raqam !== xisob_raqam) {
        const check = await WorkerService.getByXisobNumber({
          user_id,
          xisob_raqam,
        });
        if (check) {
          return res.error(req.i18n.t("accountNumberExists"), 409);
        }
      }
    }

    if (oldData.fio !== fio) {
      const check = await WorkerService.getByFio({ user_id, fio });
      if (check) {
        return res.error(req.i18n.t("fioExists"), 409);
      }
    }

    await WorkerService.update({
      fio,
      account_number,
      xisob_raqam,
      id,
    });

    return res.success(req.i18n.t("updateSuccess"), 200);
  }

  static async delete(req, res) {
    const batalon_id = req.user.batalon.id;
    const id = req.params.id;

    const oldData = await WorkerService.getById({ batalon_id, id });
    if (!oldData) {
      return res.error(req.i18n.t("workerNotFound"), 404);
    }

    await WorkerService.delete({ id });

    return res.success(req.i18n.t("deleteSuccess"), 200);
  }

  static async exportExcel(req, res) {
    const batalon_id = req.user.batalon.id;

    const result = await WorkerService.get({
      batalon_id,
      offset: 0,
      limit: 100000,
    });

    const { fileName, filePath } = await WorkerService.exportExcel(result);

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

    return res.sendFile(filePath);
  }
};
