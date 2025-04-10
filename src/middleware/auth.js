const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse.js");
const { errorCatch } = require("../utils/errorCatch.js");

module.exports = (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      throw new ErrorResponse(req.i18n.t("tokenErrror"), 403);
    }
    let decoded;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new ErrorResponse(req.i18n.t("notLoggedIn"), 403);
    }

    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (decoded.exp && decoded.exp < currentTimestamp) {
      throw new ErrorResponse(req.i18n.t("tokenErrror"), 403);
    }

    req.user = decoded;

    next();
  } catch (err) {
    errorCatch(err, res);
  }
};
