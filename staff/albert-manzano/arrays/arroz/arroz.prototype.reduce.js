'use strict';

Arroz.prototype.reduce = function (expression, initialValue = this[0]){
    if(!(expression instanceof Function)){return new TypeError(expression + 'is not a function')};

    if(this.length === 0){return new TypeError('The introduced array is empty')};

    
    if(arguments.length>1){
        var i = 0;
    }
    else{
        var i = 1;
    }
    
    var accumulator = initialValue;
    
    for (i; i<this.length; i++){
        accumulator = expression(accumulator, this[i], i);
    };
    return accumulator;
};