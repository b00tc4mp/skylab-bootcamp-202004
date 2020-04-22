'use strict'

Arroz.prototype.indexOf = function indexOf(value, indexFrom) {
  if (indexFrom === undefined) {
    indexFrom = 0;
  }
  if (indexFrom < 0) {
    indexFrom = this.length + indexFrom;
  }

  for (var i = indexFrom; i < this.length; i++) {
    if (this[i] === value) {
      return i;
    }
  }
  return -1;
}
