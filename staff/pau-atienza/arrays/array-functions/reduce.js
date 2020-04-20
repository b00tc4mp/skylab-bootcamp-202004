'use strict';

function reduce(array, expression, initialValue = array[0]){
    
    if (array.length === 0) return undefined;
    else if(arguments.length>2) var i = 0;
    else var i = 1;
    
    var accumulator = initialValue;
    
    for (i; i<array.length; i++){
        accumulator = expression(accumulator, array[i], i);
    };

    return accumulator;
};