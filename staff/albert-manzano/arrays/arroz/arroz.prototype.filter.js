'use strict'

Arroz.prototype.filter = function filter(expression) {
    var result = new Arroz();

    for (var i = 0; i < this.length; i++) {
        if (expression(this[i], i, this)) {
            result[result.length++] = this[i];
        }
    }
    return result;
}