'use strict';

Arroz.prototype.join = function(separator) {

    if (typeof separator != "string") separator = ",";

    var result = "";
    for (var i = 0; i < this.length; i++) {
        result += this[i];
        if (i != this.length - 1)
            result += separator;
    }
    return result;
}