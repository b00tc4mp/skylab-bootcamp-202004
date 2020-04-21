"use strict";
Arroz.prototype.pop = function() {
  if (this.length - 1 < 0) {
    throw new RangeError('you cannot delete elements from an empty Arroz');
  }
  
  var lastElement = this[this.length - 1];
  this.length--;
  return lastElement;
}