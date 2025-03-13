"use strict";

var jwt = require('jsonwebtoken');
var generateToken = function generateToken(user) {
  var payload = user;
  var secret = process.env.JWT_SECRET;
  var options = {
    expiresIn: process.env.JWT_EXPIRE || '30d'
  };
  var token = jwt.sign(payload, secret, options);
  return token;
};
module.exports = generateToken;