"use strict";

Arroz.prototype.reduce = function (callback, initialValue) {
  if (!(callback instanceof Function))
    throw new TypeError(callback + " is not a function");
  var accumulator = initialValue;
  var i = 0;

  if (initialValue === undefined) {
    accumulator = this[i];
    i = 1;
  }
  for (i; i < this.length; i++)
    accumulator = callback(accumulator, this[i], i, this);

  return accumulator;
};
