"use strict";

Arroz.prototype.find = function(expression) {
    if(typeof expression !== 'function') {
        throw new TypeError(expression + ' is not a function')
    }

    for (var i = 0; i < this.length; i++) {
        if(expression(this[i])) {
            return this[i];
        };
    }
    return undefined;
};