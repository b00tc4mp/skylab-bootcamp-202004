'use strict';

function slice(array, elem1, elem2) {
    var result = [];
    
    if (typeof elem1 === 'undefined' && typeof elem2 === 'undefined') {
        for (var i = 0; i < array.length; i++) {
            result[result.length] = array[i]
        }
    } else if (typeof elem2 === 'undefined' && elem1 < 0) {
        var num = array.length + elem1;
        if (Math.abs(elem1) < array.length) {
            for (var i = num; i < array.length; i++) {
                result[result.length] = array[i];
            }
        } else {
            for (var i = 0; i < array.length; i++) {
                result[result.length] = array[i];
            }
        }
    } else if (typeof elem2 === 'undefined') {
        for (var i = elem1; i < array.length; i++) {
            result[result.length] = array[i];
        }
    } else if (elem1 > 0 && elem2 > 0) {
        for (var i = elem1; i < elem2; i++) {
            result[result.length] = array[i];
        }
    } else if (elem1 > 0 && elem2 < 0) {
        var num = array.length + elem2 - 1;
        for (var i = elem1; i <= num; i++) {
            result[result.length] = array[i];
        }
    }

    return result
}