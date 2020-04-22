function every(array, expression) {
    if (array.length === 0){
        return false;
    }

    for (var i = 0; i < array.length; i++) {
        if(!expression(array[i], i, array)){
            return false;
        };
    }
    return true;
};