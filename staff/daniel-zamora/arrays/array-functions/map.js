// TODO
function map(array, expression) {
    var result = [];
    for (var i = 0; i < array.length; i++){
       result[result.length] = expression(array[i],i,array);
    }
       return result 

}