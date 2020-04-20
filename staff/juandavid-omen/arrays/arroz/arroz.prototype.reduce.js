"use strict";

Arroz.prototype.reduce = function(expression, initialValue){
    if(arguments.length > 1) {
        if(initialValue >= this.length) {
            return undefined;
        }
        var i = initialValue + 1;
        var accumulator = this[initialValue]
    } else {
        if(this.length === 0){
            return undefined;
        }
        var i = 1;
        var accumulator = this[0]
    }
    
    for(i; i<this.length; i++) {
        accumulator = expression(accumulator, this[i], i);
    };
    return accumulator;
};

/* if (this.length === 0) {
    throw new TypeError('Reduce of empty array with no initial value at Arroz.reduce');
}

if (typeof expression !== 'function') {
    throw new TypeError(expression + ' is not a function');
} */