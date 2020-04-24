"use strict";

Object.defineProperty(Arroz.prototype, "includes", {
  value: function (searchValue, index) {
    if (typeof index === "undefined") index = 0;
    else if (index < 0) index = this.length + index;
    var i = index;
    for (i; i < this.length; i++) {
      if (searchValue instanceof Object) {
        if (searchValue === this[i]) return true;
      } else if (searchValue.toString() === this[i].toString()) {
        return true;
      }
    }
    return false;
  },
  enumerable: false,
  writable: true,
});

// if(Object.is(searchValue, this[i])) return true;
