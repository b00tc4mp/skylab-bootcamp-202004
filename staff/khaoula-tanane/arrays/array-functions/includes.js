function includes(array, element, start = 0){
    for(var i =start; i < array.length; i++){
        if(array[i] === element) return true
    }
    return false
} 
