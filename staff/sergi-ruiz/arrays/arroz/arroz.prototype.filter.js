'use strict';

Arroz.prototype.filter = function(expression) {

    if (typeof expresion !== "function") throw new TypeError("expresion is not a function");

    var newArray = new Arroz();

    for (var i = 0; i < this.length; i++) {
        if (expression(this[i], i, this)) {
            newArray[newArray.length++] = this[i];
        }
    }
    return newArray;
}