'use strict';

Arroz.prototype.forEach = function forEach(expression) {
    if(typeof expression !== 'function') throw new TypeError(expression + ' is not a function');

    for (var i = 0; i < this.length; i++)
        expression(this[i], i, this);
};