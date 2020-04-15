"use strict";

Arroz.prototype.reduce = function(expression, initialValue){
    
    if(arguments.length>1){
        if(initialValue>= this.length){
            return undefined;
        }
        var i = initialValue + 1;
        var accumulator = this[initialValue]
    }
    else{
        if (this.length === 0){
            return undefined;
        }
        var i = 1;
        var accumulator = this[0]
    }
    
    for (i; i<this.length; i++){
        debugger;
        accumulator = expression(accumulator, this[i], i);
        debugger;
    };
    return accumulator;
};