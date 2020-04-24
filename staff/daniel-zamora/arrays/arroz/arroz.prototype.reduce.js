"use strict";

Object.defineProperty(Arroz.prototype, "reduce", {
  value: function (expression, initialValue) {
    if (typeof expression !== 'function') throw new TypeError(expression + ' is not a function');
    if (typeof initialValue === "undefined") initialValue = this[0];
    var acumulator = initialValue;
    for (var i = initialValue; i < this.length; i++) {
      acumulator = expression(acumulator,this[i]);
    }
    return acumulator;
  },
  enumerable: false,
  writable: true,
});

