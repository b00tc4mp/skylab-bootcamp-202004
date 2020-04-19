"use strict";

Arroz.prototype.indexOf = function (element, start) {
  if (start === undefined) start = 0;
  if (start < 0) start = this.length + start;

  for (var i = start; i < this.length; i++) {
    if (element === this[i]) return i;
  }
  return -1;
};
