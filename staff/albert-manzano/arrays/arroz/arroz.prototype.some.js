'use strict';

Arroz.prototype.some = function(condition) {
    for (var i = 0; i < this.length; i++) {
        if (condition(this[i], i, this))
            return true;
    }
    return false;
}