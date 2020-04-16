'use strict'

Arroz.prototype.every = function(expression, thisArg = undefined) {
    if(!(expression instanceof Function)){throw new TypeError(expression + 'is not a function')};

    // if(thisArg !== undefined && !(thisArg instanceof Array)){throw new TypeError(thisArg + 'is not an Array')}

    for (var i = 0; i < this.length; i++) {
        if (!expression(this[i], i, this, thisArg))
            return false
    }
    return true
}