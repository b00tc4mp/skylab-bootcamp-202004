function every(array, callback){
    for(var i = 0; i < array.length; i++){
        if(!callback(array[i], i, array)){
            return false
        }
    }
    return true
} 