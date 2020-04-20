function map(array,expression){
    var result = [];
    for (var i = 0; i <array.length; i++){
        result[i] = expression(result[i])
    }
    return result
}