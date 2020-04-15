'use strict';

Arroz.prototype.join = function (separator) {
    var str = "";
    if (!separator) {
        separator = ",";
    }

    if (this.length === 0) {
        return "";
    }

    for (var i = 0; i < this.length-1; i++) {
        str += this[i] + separator;
    }
    str += this[this.length-1]
    return str;
}