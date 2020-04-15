'use strict';

Arroz.prototype.reduce = function (expression, accum) {
    if (!accum) {
        accum = 0;
    }

    for (var i = 0; i < this.length; i++) {
        accum = expression(accum, this[i], i, this);
    }
    return accum;
}