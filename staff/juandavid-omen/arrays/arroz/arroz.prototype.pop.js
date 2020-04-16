"use strict";
Arroz.prototype.pop = function() {
  if (this.length - 1 < 0) {
    return undefined;
  }
  
  var lastElement = this[this.length - 1];
  this.length--;
  return lastElement;
}