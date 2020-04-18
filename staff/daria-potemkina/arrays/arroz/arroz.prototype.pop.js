'use strict';

Arroz.prototype.pop = function () {
    if (this.length > 0) {
        var deleted = this[this.length - 1];
        delete this[this.length-1];
        this.length--;
        return deleted;
    } else {
        return undefined;
    }
}