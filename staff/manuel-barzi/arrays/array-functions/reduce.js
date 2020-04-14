'use strict';

function reduce(array, expression, initialValue) {
    var accumulator;
    var offset = 0;

    if (typeof initialValue === 'undefined') {
        accumulator = array[0];

        offset = 1;
    } else accumulator = initialValue

    for (var i = offset; i < array.length; i++) {
        var element = array[i];

        accumulator = expression(accumulator, element);
    }

    return accumulator;
}