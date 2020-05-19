function filter(array, callback){
    var filtered = []
    for(var i = 0; i < array.length; i++){
        if(callback(array[i], i, array)){
            filtered[filtered.length] = array[i]
        }
    }
    return filtered
} 