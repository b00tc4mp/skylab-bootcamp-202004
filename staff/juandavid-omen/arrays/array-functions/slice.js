function slice(array) {
    var result = [];
    var begin = 0;
    var end = 0;

    if (arguments.length == 3) {
        begin = arguments[1];
        end = arguments[2];
    } else if (arguments.length == 2) {
        end = arguments[1];
    }
    
    if (begin > array.length) {
        return result;
    }

    for (var i = begin; i < end; i++) {
        result[result.length] = array[i];
    }
    return result;
    
}