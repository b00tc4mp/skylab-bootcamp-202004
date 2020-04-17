'use strict'

Object.defineProperty(Arroz.prototype, 'filter', {
    value: function filter(expression, thisArg) {
        var result = new Arroz();
        if(!(expression instanceof Function)){throw new TypeError(expression + ' is not a function')};
        
        for (var i = 0; i < this.length; i++) {
            if (expression(this[i], i, this, thisArg)) {
                result[result.length++] = this[i];
            }
        }
        return result;
    },
    enumerable: false,
    writable:true
})

