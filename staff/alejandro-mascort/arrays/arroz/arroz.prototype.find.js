'use strict';

Arroz.prototype.find = function(expression) {
    for (var i = 0; i < this.length; i++) {
        if (expression(this[i], i, this)) {
            return this[i];
        }
    }
}