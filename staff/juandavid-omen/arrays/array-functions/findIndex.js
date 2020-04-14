function findIndex(array, expression) {
    for (let i = 0; i < array.length; i++) {
          if(expression(array[i], i, array)){
            return i;
        };
    }
    return -1;
};