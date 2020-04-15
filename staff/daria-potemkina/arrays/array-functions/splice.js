'use strict'
function splice(array, start, deleteCount, ...arg) {
    var result = [];
    if (typeof deleteCount === 'undefined') {
        if (start > 0) {
            for (var i = start; i < array.length; i++) {
                result[result.length] = array[i];
            }
            if (start <= array.length) {
                array.length = start;
            }

        } else if (start < 0) {
            if (array.length + start < 0) {
                for (var i in array) {
                    result[result.length] = array[i];
                }
                array.length = 0;
            } else {
                var num = array.length + start;
                for (var i = num; i < array.length; i++) {
                    result[result.length] = array[i];
                }
                array.length += start
            }
        }
    } else {

        var newArray = [];
        for (var i = start; i < start + deleteCount; i++) {
            result[result.length] = array[i];
        }

        for (var j = start + deleteCount; j < array.length; j++) {
            newArray[newArray.length] = array[j]
        }

        array.length = start;
        for (var n in newArray) {
            array[array.length] = newArray[n]
        }

    }
    return result;
}