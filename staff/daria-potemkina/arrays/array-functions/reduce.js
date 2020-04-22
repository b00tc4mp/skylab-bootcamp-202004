'use strict'

function reduce(array, expression, initialValue) {
    typeof initialValue === 'undefined' && array.length > 0 ? initialValue = 0 : initialValue;
    if(array.length === 0) throw new TypeError('Reduce of empty array with no initial value');

    var result = initialValue;

    for (var i = 0; i < array.length; i++){
        result = expression(result, array[i]);
    }

    return result;
}