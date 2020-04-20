"use strict";

Arroz.prototype.pop = function () {
  var remove = this[this.length - 1];

  this[this.length--];
  delete this[this.length];

  return remove;
};
