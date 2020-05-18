function indexOf(array, string, start=0){
    for(var i = start; i < array.length; i++){
        if(array[i] === string){
            return i
        }
    }
    return -1
} 
