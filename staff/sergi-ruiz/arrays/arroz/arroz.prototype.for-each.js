'use strict';

Arroz.prototype.forEach = function forEach(expression) {
    for (var i = 0; i < this.length; i++)
        expression(this[i], i, this);
};