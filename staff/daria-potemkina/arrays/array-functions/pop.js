'use strict';

function pop(array) {
    if (array.length > 0) {
        var deleted = [array[array.length-1]];
        array.length--;
//faltaría borrar el último elemento
        return deleted  
    }else{
        return undefined;
    }
        
}