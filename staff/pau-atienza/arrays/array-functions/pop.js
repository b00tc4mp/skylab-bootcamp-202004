'use strict';

function pop(array) {
    
    if (array.length === 0) {
        return undefined;
    }
    var lastElement = array[array.length-1]
    array.length--;
    return lastElement;
};