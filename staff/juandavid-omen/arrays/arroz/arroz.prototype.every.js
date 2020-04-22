"use strict";

Arroz.prototype.every = function(expression) {
    if(typeof expression !== "function") {
        throw new TypeError(expression + ' is not a function');
    }

    if (this.length === 0) {
        return false;
    }

    for (var i = 0; i < this.length; i++) {
        if(!expression(this[i])) {
            return false;
        };
    }
    return true;
};