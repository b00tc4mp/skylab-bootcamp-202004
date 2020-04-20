'use strict';

function map(array, expression) {
    var arr = []
    for (var i = 0; i < array.length; i++)
        arr[i] = expression(array[i], i, array);
    return arr;
}
