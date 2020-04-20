'use strict';

function reduce(array, expression, initialValue) {
    var accumulator = initialValue;

    for (var i in array) {
        var element = array[i];

        accumulator = expression(accumulator, element);
    }

    return accumulator;
}