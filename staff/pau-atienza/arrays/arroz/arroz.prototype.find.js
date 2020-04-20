'use strict'

Object.defineProperty(Arroz.prototype, 'find', {
    value: function (element, thisArg) {
        if(!(element instanceof Function)){return new TypeError(element + ' is not a function')}
    
        for (var i = 0; i < this.length; i++) {
            if (element(this[i], i, this, thisArg)) {
                return this[i];
            };
        };
    },
    enumerable: false,
    writable: true
});