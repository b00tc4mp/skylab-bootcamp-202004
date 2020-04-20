'use strict';

Object.defineProperty(Arroz.prototype, 'reduce', {
    value: function (expression, initialValue = this[0]){
        if(!(expression instanceof Function))   return new TypeError(expression + ' is not a function');
    
        else if(this.length === 0 && initialValue === undefined)    return new TypeError('Reduce of empty array with no initial value');
    
        else if(arguments.length>1) var i = 0;
    
        else    var i = 1;
        
        var accumulator = initialValue;
        
        for (i; i<this.length; i++){
            accumulator = expression(accumulator, this[i], i, this);
        };
        
        return accumulator;

    },
    enumerable: false,
    writable: true
});