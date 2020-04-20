"use strict";

Arroz.prototype.join = function (separator) {
  if (separator === undefined) separator = ",";
  var stringed = "";
  for (var i = 0; i < this.length; i++) {
    if (i !== this.length - 1) stringed += `${this[i]}` + separator;
    else stringed += `${this[i]}`;
  }
  return stringed;
};
