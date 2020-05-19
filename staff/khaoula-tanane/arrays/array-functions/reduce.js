function reduce(array, callback, initialValue = 0){
    var result = initialValue
    for(var i = 0; i < array.length; i++){
        result = callback(result, array[i], i,  array)
    }
    return result
} 