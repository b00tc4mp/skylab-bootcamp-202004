'use strict';

function indexOf(array, element, index) {
    if (index === undefined) {
        for (var i = 0; i < array.length; i++) {
            if (array[i] === element) {
                return i
            }
        }
    }else {
        for (var j = index; j < array.length; j++) {
            if (array[j] === element) {
                return j
            }
        }
    }
    return -1

}