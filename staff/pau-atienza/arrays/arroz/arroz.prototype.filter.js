'use strict'

Arroz.prototype.filter = function filter(expression, thisArg) {
    var result = new Arroz();
    if(!(expression instanceof Function)){throw new TypeError(expression + 'is not a function')};
    
    for (var i = 0; i < this.length; i++) {
        if (expression(this[i], i, this, thisArg)) {
            result[result.length++] = this[i];
        }
    }
    return result;
}