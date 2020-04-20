"use strict";

Arroz.prototype.slice = function (start, end) {
  if (start === undefined) start = 0;
  if (end === undefined) end = this.length;

  var arroz = new Arroz();

  for (var i = start; i < end; i++) {
    arroz[arroz.length] = this[i];
    arroz.length++;
  }
  return arroz;
};
