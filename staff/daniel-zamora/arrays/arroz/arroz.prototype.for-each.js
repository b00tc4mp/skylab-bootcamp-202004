'use strict';

Object.defineProperty(Arroz.prototype, 'forEach', {
    value: function(expression) {
        if (typeof expression !== 'function') throw new TypeError(expression + ' is not a function');
        
        for (var i = 0; i < this.length; i++)
            expression(this[i], i, this);
    },
    enumerable: false,
    writable: true
});