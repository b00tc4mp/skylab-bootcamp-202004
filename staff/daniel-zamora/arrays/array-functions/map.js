// TODO
function map(array, expression) {
    var result = [];
    for (var i = 0; i < array.length; i++)
       expression(array[i],i);
        
}