"use strict";

if (!start) start = 0;
if (element === undefined) throw TypeError(`${element} is required`);
Arroz.prototype.includes = function (element, start) {
  for (var i = start; i < this.length; i++) {
    if (this[i] === element) return true;
  }
  return false;
};
