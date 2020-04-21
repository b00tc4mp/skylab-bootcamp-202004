'use strict'
Arroz.prototype.every = function every(expression) {

  for (var i = 0; i < this.length; i++) {
    if (!expression(this[i])) {
      return false;
    }  
  }
   return true;
}
