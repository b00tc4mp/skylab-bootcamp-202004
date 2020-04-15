'use strict';

Arroz.prototype.forEach = function(expression) {
    for (var i = 0; i < this.length; i++)
        expression(this[i], i, this);
};