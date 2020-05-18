function some(array, callback){
    for(var i = 0; i < array.length; i++){
        var result = callback(array[i], i, array)
        if (result) return true
    }
    return false
} 
