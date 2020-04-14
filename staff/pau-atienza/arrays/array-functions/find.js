
function find(array, expression) {
    for (let i = 0; i < array.length; i++) {
          if(expression(array[i], i, array)){
            return array[i];
        };
    }
    return undefined;
};