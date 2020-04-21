"use strict";
//Hello is not a function
 Arroz.prototype.filter = function(expression) {
    if (typeof expression !== 'function') {
        throw new TypeError(expression + ' is not a function');
    }    
    
    var result = [];

    for (var i = 0; i < this.length; i++) {
        if (expression(this[i])) {
            result[result.length++] = this[i];
        };
    }
    return result;
};
