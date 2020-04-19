"use strict";

Arroz.prototype.forEach = function (callback) {
  if (!(callback instanceof Function))
    throw new TypeError(callback + " is not a function");

  for (var i = 0; i < this.length; i++) callback(this[i], i, this);
};
