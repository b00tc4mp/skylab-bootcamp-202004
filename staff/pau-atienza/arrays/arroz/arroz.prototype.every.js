'use strict'

Object.defineProperty(Arroz.prototype, 'every', {
    value: function(expression, thisArg = undefined) {
        if(!(expression instanceof Function)){throw new TypeError(expression + ' is not a function')};
    
        for (var i = 0; i < this.length; i++) {
            if (!expression(this[i], i, this, thisArg))
                return false
        }
        return true
    },
    enumerable: false,
    writable: true
});