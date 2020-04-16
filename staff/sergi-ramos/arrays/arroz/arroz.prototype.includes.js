'use strict'
Arroz.prototype.includes = function (element, position) {
    var boolean;
    if (position === undefined) {
        position = 0;
    }
    for (var i = position; i < this.length; i++) {

        if (this[i] === element) {
            return true;
        } else {
            return false;
        }
    }
}
