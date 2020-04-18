'use strict'

Object.defineProperty(Arroz.prototype, "some", {
  value: function (callback) {
    if (typeof callback !== "function")
      throw new TypeError(callback + " is not a function");
    if (this.length === 0) return false;
    for (var i = 0; i < this.length; i++) {
      if (callback(this[i])) {
        return true;
      }
    }
    return false;
  },
  enumerable: false,
  writable: true,
});
