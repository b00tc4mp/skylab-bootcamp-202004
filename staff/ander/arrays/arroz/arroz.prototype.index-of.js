"use strict";

Arroz.prototype.indexOf = function (value, initialValue) {
  if (initialValue === undefined) {
    initialValue = 0;
  }

  if (initialValue >= this.length) {
    return -1;
  }

  if (initialValue < 0) {
    initialValue = this.length + initialValue;
  }
  for (var i = initialValue; i < this.length; i++) {
    if (this[i] === value) {
      return i;
    }
  }
  return -1;
};