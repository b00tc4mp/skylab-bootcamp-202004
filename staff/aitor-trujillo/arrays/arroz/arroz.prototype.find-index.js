"use strict";

Arroz.prototype.findIndex = function (callback) {
  if (!(callback instanceof Function))
    throw new TypeError(callback + " is not a function");

  for (var i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) return i;
  }
  return -1;
};
