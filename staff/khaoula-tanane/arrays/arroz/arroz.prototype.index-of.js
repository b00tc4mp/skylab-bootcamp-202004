"use strict";

if (!start) start = 0;
if (element === undefined) throw TypeError(`search value is required`);
Arroz.prototype.indexOf = function (element, start) {
  for (var i = start; i < this.length; i++) {
    if (this[i] === element) {
      return i;
    }
  }
  return -1;
};
