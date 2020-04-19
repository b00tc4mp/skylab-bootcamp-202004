'use strict'

Object.defineProperty(Arroz.prototype, 'reduce', {
    
    value: function (callback, initalValue) {
        if(typeof callback !== 'function') throw new TypeError(callback + ' is not a function')
        if(this.length === 0 && typeof initalValue === 'undefined') throw new TypeError('Reduce of empty array with no initial value')
        var acc = 0;
        if (initalValue === undefined) {
            acc = 0;
        } else {
            acc = initalValue;
        }
        for (var i = 0; i < this.length; i++) {
            acc = callback(acc, this[i]);
        }
        return acc;
    },
    enumerable: false,
    writable: true
});