function map(array, callback){
    var mapped = []
    for(var i = 0; i < array.length; i++){
        mapped[i] = callback(array[i], i, array)
    }
    return mapped
} 