'use strict';


Arroz.prototype.reduce = function (expression, accum) {
    if (typeof expression !== 'function' ) throw new TypeError (expression + ' is not a function');
    if (this.length === 0) throw TypeError ('Arroz is empty')

    if (typeof accum === 'undefined') {
        if (typeof this[0] === 'number') accum = 0;
        else if (typeof this[0] === 'string') accum = "";

    } else if (typeof accum !== 'number') {
        accum = accum.toString();
    }

    for (var i = 0; i < this.length; i++) {
        accum = expression(accum, this[i], i, this);
    }
    return accum;
}

