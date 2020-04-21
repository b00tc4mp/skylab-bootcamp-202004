function forEach(array, expression) {
    for (var i = 0; i < array.length; i++)
        expression(array[i], i, array);
}