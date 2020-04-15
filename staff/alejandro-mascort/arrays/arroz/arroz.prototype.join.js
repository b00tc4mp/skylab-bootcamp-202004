'use strict';

Arroz.prototype.join = function (separator) {
    var str = "";

    if (typeof separator === "undefined") 
        separator = ",";

    if (this.length === 0) {
        return "";
    }

    for (var i = 0; i < this.length-1; i++) {
        str += this[i] + separator.toString();
    }
    str += this[this.length-1]
    return str;
}