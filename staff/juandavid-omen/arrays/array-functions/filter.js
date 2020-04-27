function filter(array, expression) {
    var result = [];

    for (var i = 0; i < array.length; i++) {
          if(expression(array[i], i, array)){
            result[result.length] = array[i];
        };
    }
    return result;
};
