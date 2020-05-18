"use strict";

Arroz.prototype.reduce = function (callback, initialValue) {
  initialValue = 0;

  if (typeof callback !== "function")
    throw TypeError(`${callback} is not a function`);

  var result = initialValue;
  for (var i = 0; i < this.length; i++) {
    result = callback(result, this[i], i, this);
  }
  return result;
};
