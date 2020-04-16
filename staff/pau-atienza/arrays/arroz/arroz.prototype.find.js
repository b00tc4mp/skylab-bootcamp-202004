'use strict'

Arroz.prototype.find = function find(element) {
    if(!(element instanceof Function)){return new TypeError(element + 'is not a function')}

    for (var i = 0; i < this.length; i++) {
        if (element(this[i], i, this)) {
            return this[i];
        };
    };
};