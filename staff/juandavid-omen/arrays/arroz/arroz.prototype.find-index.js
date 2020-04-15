"use strict";

Arroz.prototype.findIndex = function(expression) {
    for (var i = 0; i < this.length; i++) {
          if(expression(this[i], i, this)){
            return i;
        };
    }
    return -1;
};