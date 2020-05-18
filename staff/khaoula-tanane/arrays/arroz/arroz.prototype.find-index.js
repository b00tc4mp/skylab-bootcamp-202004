"use strict";

if (typeof callback !== "function") throw TypeError(`${callback} is not a function`);
Arroz.prototype.findIndexOf = function (callback) {
  for (var i = 0; i < this.length; i++) {
    var result = callback(this[i], i, this);
    if (result) return i;
  }
  return -1;
};
