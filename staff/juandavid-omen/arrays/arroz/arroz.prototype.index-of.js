"use strict";

Arroz.prototype.indexOf = function(element, index) {
    var i = 0;
    
    if (arguments.length > 1) {
        if (typeof index !== 'number') {
            throw new TypeError(index + ' must be numeric');
        }
        if(index >= this.length) {
            return -1
        } else {
             i = index
        }
    }

    for(i; i < this.length; i++) {
        if(this[i] === element) {
            return i;
        };
    };
    return -1;
};