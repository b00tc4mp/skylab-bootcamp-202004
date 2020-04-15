"use strict";

Arroz.prototype.filter = function (callback) {
  if (!(callback instanceof Function))
    throw new TypeError(callback + " is not a function");

  var newArroz = new Arroz();
  for (var i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) newArroz[newArroz.length++] = this[i];
  }

  return newArroz;
};
