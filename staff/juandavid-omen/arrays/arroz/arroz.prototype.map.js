"use strict";

Arroz.prototype.map = function(expression) {
    if(typeof expression !== 'function') {
        throw new TypeError(expression + ' is not a function');
    }

    var result = [];

    for(var i = 0; i < this.length; i++) { 
        result[i] = expression(this[i], i, this);
    };
    return result;
};