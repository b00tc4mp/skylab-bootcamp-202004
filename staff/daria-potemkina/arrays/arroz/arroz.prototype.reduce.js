'use strict'

Arroz.prototype.reduce = function(expression, initialValue) {
    if(this.length === 0) throw new TypeError('Reduce of empty array with no initial value');
    if(typeof expression !== 'function') throw new TypeError(expression + ' is not a function');

    typeof initialValue === 'undefined' && this.length > 0 ? initialValue = 0 : initialValue;

    var result = initialValue;

    for (var i = 0; i < this.length; i++){
        result = expression(result, this[i]);
    }

    return result;
}