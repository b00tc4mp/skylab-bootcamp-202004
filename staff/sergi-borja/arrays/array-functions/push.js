function push(array, elements) {
    for(var i = 1; i < arguments.length; i++)
         array[array.length] = arguments[i]; 
    
    return arguments[0].length
}
