'use strict'

Object.defineProperty(Arroz.prototype, 'findIndex', {
    value: function (element, thisArg) {
        if (!(element instanceof Function)) throw new TypeError(element + ' is not a function');
        
        for (var i = 0; i < this.length; i++) {
            if (element(this[i], i, this, thisArg)) {
                return i;
            };
        };
        return -1;
    },
    enumerable: false,
    writable: true
});