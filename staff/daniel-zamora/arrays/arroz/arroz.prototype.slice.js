"use strict";

Object.defineProperty(Arroz.prototype, "slice", {
  value: function (start, end) {
    var result = [];
    if (start >= 0 && typeof end === "undefined") {
      var i = start
      for (i; i < this.length; i++) {
        result[result.length] = this[i];
      }
      return result;
    } else if (start < 0 && (typeof end === "undefined" || end > this.length)) {
      start = this.length + start;
      for (var i = start; i < this.length; i++) {
        result[result.length] = this[i];
      }
      return result;
    } else if (start >= 0 && end < 0) {
      end = this.length + end;
      for (var i = start; i < end; i++) {
        result[result.length] = this[i];
      }
      return result;
    }
    if (start > this.length || (typeof start === "undefined" && typeof end === "undefined"))
      return result;
  },
  enumerable: false,
  writable: true,
});
