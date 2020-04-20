function pop(array){
    if(array.length===0){
        return undefined;
    }
    var lastIndex = array.length-1;
    var lastPosition = array[lastIndex];
    array.length = array.length-1;
    return lastPosition; 
}

