'use strict';

Arroz.prototype.set = function (i, value) {
    if (typeof i !== 'number') throw new TypeError(i + ' is not a number');
    
    this[i] = value;

    i > this.length && (this.length = i + 1);
};