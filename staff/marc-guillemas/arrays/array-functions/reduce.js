// arr.reduce(callback( accumulator, currentValue[, index[, array]] )[, initialValue])

function reduce(arr, callback, initialValue = 0){
    var result = 0;
    for(var i = initialValue; i < arr.length; i++){
        result = callback(arr[i],result)
        
    }
    return result;
}
