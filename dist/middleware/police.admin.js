"use strict";

var ErrorResponse = require('../utils/errorResponse');
var police = function police() {
  try {
    return function (req, res, next) {
      if (req.user.region) {
        throw new ErrorResponse(req.i18n.t('policeError'), 403);
      }
      next();
    };
  } catch (error) {
    throw new ErrorResponse(error, error.statusCode);
  }
};
module.exports = {
  police: police
};