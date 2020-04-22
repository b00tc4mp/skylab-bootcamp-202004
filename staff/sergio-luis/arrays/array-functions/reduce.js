function reduce(array, expression, initialValue) {
    var result = 0;
    if (array.length !== 0) {
        if (typeof initialValue === 'undefined') {
            initialValue = 0;
        }
        for (var i = 0; i < array.length; i++) {
            var acumulator = result;
            result = expression(acumulator, array[i]);
        }
        result = initialValue + result;
        return result;
    }
    return "Error: Reduce of empty array with no initial value";
}

// // var acumulator = array[0]
// // for (var i = 0; i < array.length; i++) {
// //    acumulator = expression(acumulator, array[i]);
// // }

// function reduce(array,expresion,initialValue){
//     var accumulator = typeof initialValue === 'undefined'? array[0]:initialValue
//     for(var i = 0; i<array.lenght;i++){
//         accumulator = expresion(accumulator,array[i])
//     }
//     return accumulator
// }