"use strict";

Object.defineProperty(Arroz.prototype, "join", {
  value: function (separator) {
    var emptyArr = [];
    var fullString = "";
    if (
      typeof separator === "undefined" ||
      this.length === 0 ||
      separator === null
    ) {
      return emptyArr;
    }
    for (var i = 0; i < this.length; i++) {
      if (separator === "") {
        if (fullString.length === 0) {
          fullString = this[i];
        } else {
          fullString = fullString + "" + this[i];
        }
      } else {
        if (fullString.length === 0) {
          fullString = this[i];
        } else {
          fullString = fullString + separator + this[i];
        }
      }
    }
    return fullString;
  },
  enumerable: false,
  writable: true,
});
