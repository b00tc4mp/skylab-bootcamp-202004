function map(array, expression) {
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
        newArray[i] = expression(array[i], i, array);
    }
    return newArray;
}