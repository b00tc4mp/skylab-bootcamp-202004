function find(array,expression){

    for(var i=0; i< array.length; i++){
        if(expression(array[i], i, array)){
            return array[i]
        }
    }
    return undefined
}

// function find (array, expression) {
//     for (var i = 0; i < array.length; i++) {
//       expression(array[i], position = i) && return array[i];
//     }
//     return;
//   }