"use strict";

Arroz.prototype.push = function() {
  for (var i in arguments) {
    if (typeof arguments[i] !== 'number') {
      throw new TypeError(arguments[i] + ' must be numeric');
    }
    this[this.length++] = arguments[i];
  }

  return this.length;
};
