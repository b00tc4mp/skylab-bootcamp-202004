'use strict'

Arroz.prototype.includes = function (element, index) {
    if (typeof index === 'undefined'){ 
        index = 0;

    } else if (index >= this.length) {
        return false
    } else if (index < 0) {
        index = this.length - 1 + index;
         if ( index < 0) {
            index = 0;
         }
    } else {
        index = index;
    };

    for (index; index < this.length; index++) {
        if (this[index] === element) {
            return true;
        };
    };
    return false;
};