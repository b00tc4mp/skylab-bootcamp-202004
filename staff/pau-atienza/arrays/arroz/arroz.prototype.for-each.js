'use strict';

Object.defineProperty(Arroz.prototype, 'forEach', {
    value: function(expression, thisArg) {
        for (var i = 0; i < this.length; i++) expression(this[i], i, this, thisArg)
    },
    enumerable: false,
    writable: true
});