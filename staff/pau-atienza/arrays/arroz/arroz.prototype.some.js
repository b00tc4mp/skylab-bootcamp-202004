'use strict';

Object.defineProperty(Arroz.prototype, 'some', {
    value: function(condition, thisArg) {
        if(!(condition instanceof Function)){throw new TypeError(condition + ' is not a function')};
        for (var i = 0; i < this.length; i++) {
            if (condition(this[i], i, this, thisArg))
                return true;
        }
        return false;
    },
    enumerable: false,
    writable: true
});