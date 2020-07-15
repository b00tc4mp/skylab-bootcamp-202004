function filter(array, expression) {
    var a = []
    
    for (var i = 0; i < array.length; i++)
        if(expression(array[i],i))
        a[a.length] = array[i];
    
return a
}