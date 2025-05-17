exports.Middleware = class {
  static checkBatalon(req, res, next) {
    if (!req.user.batalon) {
      return res.error(req.i18n.t("batalonNotFound"), 404);
    }

    next();
  }
};
