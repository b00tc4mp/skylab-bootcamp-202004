'use strict';

Arroz.prototype.indexOf = function (value, indexFrom = 0) {
  if (arguments.length === 0) return -1;
  if (indexFrom < 0) indexFrom = this.length + indexFrom;
  
  for (var i = indexFrom; i <this.length; i++) {
  if (this[i] === value) return i;
  }
  return -1
}
