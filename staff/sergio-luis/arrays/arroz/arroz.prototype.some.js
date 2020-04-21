"use strict";

Arroz.prototype.some = function (expression) {
    if (typeof expression !== 'function') throw new TypeError(expression + ' is not a function');

    var control = false;
    if (this.length === 0) return false

    for (var i in this)
        if (expression(this[i])) return control = true;

    return control
}