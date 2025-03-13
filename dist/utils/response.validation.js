"use strict";

var ErrorResponse = require('../utils/errorResponse');
var validationResponse = function validationResponse(func, data) {
  var _func$validate = func.validate(data),
    error = _func$validate.error,
    value = _func$validate.value;
  if (error) {
    throw new ErrorResponse('Malumot notog\'ri kiritildi !', 400);
  }
  return value;
};
module.exports = {
  validationResponse: validationResponse
};