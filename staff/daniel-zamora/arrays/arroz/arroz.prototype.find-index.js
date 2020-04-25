"use strict";

Object.defineProperty(Arroz.prototype, "findIndex", {
  value: function (expression) {
    if (typeof expression !== 'function') throw new TypeError(expression + ' is not a function');

    for (var i = 0; i < this.length; i++) {
     if(expression(this[i],i,this)) 
     return i;
    }
    return -1;
    
  },
  enumerable: false,
  writable: true,
});
