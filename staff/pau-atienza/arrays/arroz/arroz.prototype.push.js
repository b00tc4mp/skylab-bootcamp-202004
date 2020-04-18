'use strict';

Object.defineProperty(Arroz.prototype, 'push', {
    value: function() {
        for (var i in arguments) this[this.length++] = arguments[i];

        return this.length;
    },
    enumerable: false,
    writable: true
});
