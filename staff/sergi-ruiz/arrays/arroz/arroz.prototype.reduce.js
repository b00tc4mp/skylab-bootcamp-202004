'use strict';

Arroz.prototype.reduce = function(expresion, initialValue) {
    if (typeof expresion !== "function") throw new TypeError("expresion is not a function");

    if (typeof initialValue != "number") initialValue = 0;

    var acumulator = 0;
    acumulator += initialValue;
    for (var i = 0; i < this.length; i++) {
        acumulator = expresion(acumulator, this[i], i, this);
    }
    return acumulator;
}