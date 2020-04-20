'use strict'

function splice(array, start, deleteCount) {
    var result = [];

    if (typeof start !== 'undefined' && typeof start === 'number') {
        if (start > 0 && start < array.length) {
            for (var i = start; i < array.length; i++)
                result[result.length] = array[i];

            array.length = start;

            for (var newElement = 3; newElement < arguments.length; newElement++)
                array[array.length] = arguments[newElement];

            if (typeof deleteCount !== 'undefined' && typeof deleteCount === 'number') {
                for (var j = deleteCount; j < result.length; j++)
                    array[array.length] = result[j];

                if (deleteCount !== 0) {
                    result.length = deleteCount;
                } else {
                    result.length = 0;
                }
            }

        } else if (start < 0) {
            if (array.length > (-start)) {
                for (var i = array.length + start; i < array.length; i++)
                    result[result.length] = array[i];

                array.length += start;

                for (var newElement = 3; newElement < arguments.length; newElement++)
                    array[array.length] = arguments[newElement];

                if (typeof deleteCount !== 'undefined' && typeof deleteCount === 'number') {
                    for (var j = deleteCount; j < result.length; j++)
                        array[array.length] = result[j];

                    if (deleteCount !== 0) {
                        result.length = deleteCount;
                    } else {
                        result.length = 0;
                    }
                }
                
            } else {
                for (var i in array)
                    result[result.length] = array[i];

                array.length = 0;
            }
        }
    }

    return result;
}