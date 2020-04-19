'use strict';

function some(array, expression) {
    for (var i = 0; i < array.length; i++){
        if (expression(array[i])){
            return true;
        }
    }
    return false;
}