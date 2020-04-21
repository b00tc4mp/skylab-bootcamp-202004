"use strict";

Arroz.prototype.includes = function(element, index) {
    var i = 0;
    
    if (arguments.length > 1) {
        if (typeof index !== 'number') {
            throw new TypeError(index + ' must be a number');
        }

        if(index >= this.length || -index >= this.length) {
            return false;
        } 

        if(index < 0) {
            i = this.length - 1 + index;
        } else {
            i = index;
        }
    }

    for (i; i < this.length; i++) {
        if(this[i] === element) {
            return true;
        }
    }
    return false;
};
