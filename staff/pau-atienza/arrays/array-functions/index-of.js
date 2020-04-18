'use strict';

function indexOf(array, element, index = 0){
    
    if (index>= array.length) return -1;  
    else var i = index;

    for(i; i<array.length; i++){
        if (array[i] === element) return i;
    };
    return -1;
};