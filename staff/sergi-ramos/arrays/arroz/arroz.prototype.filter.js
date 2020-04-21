'use strict'

Object.defineProperty(Arroz.prototype, 'filter', {
    value: function (callback) {

        if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

        var array = [];
        var cont = 0
        for (var i = 0; i < this.length; i++) {
            if (callback(this[i], i, this)) {
                array[cont] = this[i]
                cont++;
            }
        }
        return array;
    },
    enumerable: false,
    writable: true
});