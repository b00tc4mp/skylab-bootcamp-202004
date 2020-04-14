function splice(array, start, deleteCount, ...arg) {
    var result = [];
    if (start > 0) {
        for (var i = start; i < array.length; i++) {
            result[result.length] = array[i];
        }
        if(start <= array.length){
        array.length = start;
        }
    } else if (start < 0) {
        if (array.length + start < 0) {
            for(let i in array){
                result[result.length] = array[i];
            }
            array.length = 0;
        } else {
            var num = array.length + start;
            for (var i = num; i < array.length; i++) {
                result[result.length] = array[i];
            }
            array.length += start
        }
    }
    return result;
}