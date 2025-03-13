"use strict";

var jwt = require('jsonwebtoken');
var ErrorResponse = require('../utils/errorResponse.js');
var _require = require('../utils/errorCatch.js'),
  errorCatch = _require.errorCatch;
module.exports = function (req, res, next) {
  try {
    var token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      throw new ErrorResponse(req.i18n.t('tokenErrror'), 403);
    }
    var decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new ErrorResponse(req.i18n.t('notLoggedIn'), 403);
    }
    var currentTimestamp = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTimestamp) {
      throw new ErrorResponse(req.i18n.t('tokenErrror'), 403);
    }
    req.user = decoded;
    next();
  } catch (err) {
    errorCatch(err, res);
  }
};