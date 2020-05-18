function pop(array){
    var lastOne = array[array.length-1]
    array.length = array.length-1
    return lastOne
} 