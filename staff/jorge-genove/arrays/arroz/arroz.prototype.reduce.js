"use stritc";

Object.defineProperty(Arroz.prototype, "reduce", {
  value: function (callback, initialValue) {
    if( typeof initialValue === 'undefined'){initialValue = this[0]}
    var accumulator = 0;
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    if (this.length === 0 && initialValue === undefined) {
      throw new TypeError("reduce of empty array with no initial value");
    }

    if (this.length === 0 && typeof initialValue !== undefined) {
      accumulator = initialValue;
      return accumulator;
    }

    if (arguments > 1) {
      var i = 0;
    } else {
      var i = 1;
    }
    accumulator = initialValue;

    for (i; i < this.length; i++) {
      accumulator = callback(accumulator, this[i], i);
    }
    return accumulator;
  },
  enumerable: false,
  writable: true,
});
