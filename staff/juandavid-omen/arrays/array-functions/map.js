function map(array, expression) {
    var result = [];
    
    for (var i = 0; i < array.length; i++){ 
        result[i] = expression(array[i], i, array);
    };
    return result;
};