'use strict';

Arroz.prototype.map = function(expression) {
    var result = new Arroz()

    for (var i = 0; i < this.length; i++)
        result[i] = expression(this[i], i, this);

    result.length = this.length;

    return result;
};