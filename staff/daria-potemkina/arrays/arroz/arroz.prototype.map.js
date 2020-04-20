'use strict';

Arroz.prototype.map = function (expression) {
    if (typeof expression !== 'function') throw new TypeError(expression + ' is not a function!');

    var arr = new Arroz ();

    for (var i = 0; i < this.length; i++)
        arr[i] = expression(this[i], i, this);

    arr.length = this.length;

    return arr;
}
