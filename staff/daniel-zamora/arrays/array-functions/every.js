function every(array,expression) {

    for (var i = 0; i < array.length; i++) {
        if(expression(array[i],i,array)){
            return true
        }
        else 
        return false
    }
}