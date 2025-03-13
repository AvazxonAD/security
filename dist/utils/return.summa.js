"use strict";

var returnStringSumma = function returnStringSumma(num) {
  if (Number.isInteger(num)) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ",00";
  } else {
    var parts = num.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(",");
  }
};
module.exports = {
  returnStringSumma: returnStringSumma
};