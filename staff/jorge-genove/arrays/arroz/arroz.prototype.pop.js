'use strict'

Object.defineProperty(Arroz.prototype, "pop", {
  value: function (expression) {
    if (this.length === 0) {
      result = undefined;
      return result;
    }
    var result = this[this.length - 1];
    this.length = this.length - 1;
    return result;
  },
  enumerable: false,
  writable: true,
});
