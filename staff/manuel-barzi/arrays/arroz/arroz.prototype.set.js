'use strict';

Arroz.prototype.set = function (i, value) {
    this[i] = value;

    i > this.length && (this.length = i + 1);
};