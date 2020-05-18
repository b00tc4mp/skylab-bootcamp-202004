"use strict";

if (!expression) throw TypeError(`${expression} is not a function`);
Arroz.prototype.forEach = function (expression) {
  for (var i = 0; i < this.length; i++) expression(this[i], i, this);
};
