"use strict";

Arroz.prototype.includes = function (element, start) {
  if (start === undefined) start = 0;

  for (var i = start; i < this.length; i++) {
    if (element === this[i]) return true;
  }
  return false;
};
