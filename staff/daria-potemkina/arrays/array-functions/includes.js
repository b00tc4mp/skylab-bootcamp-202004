'use strict';

function includes(array, element, index){
    typeof index === 'undefined' ? index = 0 : index;
    for (var i = index; i < array.length; i++){
        if (array[i] === element) return true;
    }
    return false;
}