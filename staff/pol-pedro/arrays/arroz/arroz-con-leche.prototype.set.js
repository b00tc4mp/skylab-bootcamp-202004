'use strict';

ArrozConLeche.prototype.set = function (i, j, value) {
    if (typeof i !== 'number') throw new TypeError(i + ' is not a number');
    debugger;
    if (typeof j === 'undefined') {
        if (typeof value !== 'undefined' && !(value instanceof Arroz)) throw new TypeError(value + ' is not an Arroz');

        Arroz.prototype.set.call(this, i, value);
    } else {
        if (typeof j !== 'number') throw new TypeError(j + ' is not a number');

        var col = this[i];

        if (col) {
            col.set(j, value);
        } else {
            debugger;
            col = new Arroz;

            col.set(j, value);

            this.set(i, undefined, col);
        }
    }
};