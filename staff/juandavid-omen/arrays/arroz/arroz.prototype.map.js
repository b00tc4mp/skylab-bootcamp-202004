"use strict";

Arroz.prototype.map = function(expression) {
    var result = [];

    for(var i = 0; i < this.length; i++) { 
        result[i] = expression(this[i], i, this);
    };
    return result;
};