'use strict'

Arroz.prototype.indexOf = function(searchValue, index) {
    if (index < 0) index = 0;
    if (index > this.length) return -1;
    if (index === undefined) index = 0;
   
    for (var i = index; i < this.length; i++) {
      if (this[i] === searchValue) {
        return i;
      }
    }
    return -1;
}
  