function some(array,element) {
    for (var i in array) {
        if(element(array[i],i,array))
            return true;   
    }
    return false;
}