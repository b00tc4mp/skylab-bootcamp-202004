// TODO
function map(array, expression) {
    var result = [];
<<<<<<< Updated upstream
    for (var i = 0; i < array.length; i++)
       expression(array[i],i,array);
        
=======
    for (var i = 0; i < array.length; i++) {
        result[result.length] = expression(array[i])
    }
       return result 
>>>>>>> Stashed changes
}