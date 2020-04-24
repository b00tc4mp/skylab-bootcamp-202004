"use strict";

Object.defineProperty(Arroz.prototype, "indexOf", {
  value: function (searchValue, index) {
    if (index >= this.length) {
      return -1;
    }
    if (index < 0) {
      i = this.length + index;
    } else if (typeof index === "undefined") i = 0;
    else
    var i = index;
    for (i; i < this.length; i++) {
      if (searchValue === this[i]) {
        return i;
      }
    }
    return -1;
  },
  enumerable: false,
  writable: true,
});
