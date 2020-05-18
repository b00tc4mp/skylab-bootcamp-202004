"use strict";

Arroz.prototype.pop = function () {
  var lastOne = this[this.length - 1];
  this.length = this.length - 1;
  return lastOne;
};
