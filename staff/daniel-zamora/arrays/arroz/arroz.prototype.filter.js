"use strict";

Object.defineProperty(Arroz.prototype, "filter", {
  value: function (expression, index) {
    if (typeof expression !== "function")
      throw new TypeError(expression + " is not a function");

    var result = [];

    if (typeof index === "undefined") index = 0;
    var i = index;
    for (i; i < this.length; i++) {
      if (expression(this[i], i, this)) {
        result[result.length] = this[i];
       
      } else if (this.length === 0) {
      result = new Arroz();
      }
    }
    return result;
  },
  enumerable: false,
  writable: true,
});
