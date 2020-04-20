'use strict';

function pop(array) {
    if (array.length > 0) {
        var deleted = array[array.length-1];
        array.length--;
        return deleted  
    }else{
        return undefined;
    }
        
}