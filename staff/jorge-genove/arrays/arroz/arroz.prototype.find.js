"use strict";

Arroz.prototype.find = function (callback) {
    if(typeof callback !== 'function') throw new TypeError( callback + ' is not a function')
    var result;
  for (var i = 0; i < this.length; i++) {
    if (callback (this[i])) {
     return this[i];
    }
  }
  
  return undefined;
};
