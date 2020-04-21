"use strict"

Arroz.prototype.reduce = function reduce(expression, initialValue = 0) {
    if (this.length === 0) throw new TypeError('Reduce of empty array with no initial value at Arroz.reduce');
    if (typeof expression !== 'function') throw new TypeError(expression + ' is not a function');

    var result = initialValue;

    for (var i = 0; i < this.length; i++) {
        var acumulator = result;
        result = expression(acumulator, this[i]);
    }
    
    return result;
}