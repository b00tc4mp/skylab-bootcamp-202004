'use strict';

function indexOf(array, element, index) {
    typeof index === 'undefined' || typeof index === 'string' ? index = 0 : index;
    for(var i = index; i < array.length; i++){
        if(array[i] === element) return i;
    }
        return -1;
    }
