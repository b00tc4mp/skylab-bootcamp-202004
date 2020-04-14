function every(array, expression) {
    if (array.length ==0){
        return false;
    }
    var counter = 0;
    for (var i = 0; i < array.length; i++) {
        if(expression(array[i], i, array)){
            counter +=1;
        };
    }
    if(counter === array.length){
        return true;
    }
    return false;
};