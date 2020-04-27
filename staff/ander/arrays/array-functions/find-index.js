function findIndex(array, element) {
    for (var i = 0; i < array.length; i++) {
        if(element(array[i],i,array)){
            return i;
        }
        
    }
}