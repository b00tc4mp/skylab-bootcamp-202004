function find(array, element) {
    for (var i = 0; i < array.length; i++) {
        if(element(array[i],i,array)){
            return array[i];
        }
        
    }
}