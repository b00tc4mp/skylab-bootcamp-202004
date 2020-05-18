"use strict";

if (typeof start !== "number") throw TypeError(`${start} is not a number`);
if (typeof end !== "number") throw TypeError(`${end} is not a number`);
Arroz.prototype.slice = function (start, end) {
  var result = new Arroz();
  for (var i = start; i < this.length; i++) {
    if (i < end) {
      result[result.length++] = this[i];
    }
  }
  return result;
};
