'use strict';

Object.defineProperty(Arroz.prototype, 'set', {
    value: function (i, value) {
        this[i] = value;
    
        i > this.length && (this.length = i + 1);
    },
    enumerable: false,
    writable: true
});