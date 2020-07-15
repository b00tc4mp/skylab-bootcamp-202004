function slice(array, start, end){
    var result = []
    for(var i = start ; i < array.length; i ++){
        if(i < end ) {
            result[result.length] = array[i]
        }  
    }
    return result
} 