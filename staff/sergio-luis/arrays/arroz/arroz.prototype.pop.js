'use strict';

Arroz.prototype.pop = function () {
    if (this.length === 0) {
        return undefined;
    };

    var remove = this[this.length - 1];
    delete this[this.length - 1];
    this.length--;
    return remove;
}

