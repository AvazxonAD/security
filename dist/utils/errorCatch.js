"use strict";

var errorCatch = function errorCatch(error, res) {
  console.log(error.stack.red);
  return res.error(error.message, (error === null || error === void 0 ? void 0 : error.statusCode) || 500);
};
module.exports = {
  errorCatch: errorCatch
};