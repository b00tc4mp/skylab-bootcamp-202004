'use strict'
function some(array, callback) {
    for (var i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) {
            return true;
        }
    }
    return false
}




