"use strict";

Arroz.prototype.slice = function() {
    var result = [];
    var begin = 0;
    var end = 0;

    if (arguments.length == 2) {
        begin = arguments[0];
        end = arguments[1];
    } else if (arguments.length == 1) {
        end = arguments[0];
    }
    
    if (begin > this.length) {
        return result;
    }

    for (var i = begin; i < end; i++) {
        result[result.length++] = this[i];
    }
    return result;
    
}