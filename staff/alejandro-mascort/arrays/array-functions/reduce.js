function reduce(array, expression, accum) {
    if (!accum) {
        accum = 0;
    }

    for (var i = 0; i < array.length; i++) {
        accum = expression(accum, array[i], i, array);
    }
    return accum;
}