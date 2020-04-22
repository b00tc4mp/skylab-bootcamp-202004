function reduce(array, expression, initialValue){
    if(arguments.length >2 ){
        if(initialValue >= array.length){
            return undefined;
        }
        var i = initialValue + 1;
        var accumulator = array[initialValue]
    } else{
        if (array.length === 0){
            return undefined;
        }
        var i = 1;
        var accumulator = array[0]
    }
    
    for (i; i<array.length; i++){
        debugger;
        accumulator = expression(accumulator, array[i], i);
        debugger;
    };
    return accumulator;
};