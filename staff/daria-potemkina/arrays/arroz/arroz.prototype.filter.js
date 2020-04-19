'use strict';

Arroz.prototype.filter = function (expression) {
    if(typeof expression !== 'function') throw new TypeError(expression + ' is not a function!');

    var result = new Arroz();
    for (var i = 0; i < this.length; i++) {
        if (expression(this[i])) {
            result.push(this[i]);
        }
    }
    return result;
}