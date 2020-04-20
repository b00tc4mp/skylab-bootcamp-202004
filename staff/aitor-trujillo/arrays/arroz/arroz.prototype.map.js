"use strict";

Arroz.prototype.map = function (callback) {
  if (!(callback instanceof Function))
    throw new TypeError(callback + " is not a function");

  var result = new Arroz();

  for (var i = 0; i < this.length; i++) result[i] = callback(this[i], i, this);

  result.length = this.length;

  return result;
};
