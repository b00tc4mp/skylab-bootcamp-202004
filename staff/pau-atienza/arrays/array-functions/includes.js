'use strict';

function includes(array,element, index = 0){
    
    if (index>= array.length){
        return false;
    }
    else if (-index >= array.length){
        return false;
    }
    else if(index < 0){
        var i = array.length -1 + index;
    }
    else{
        var i = index;
    };

    for (i; i<array.length; i++){
        if (array[i] === element){
            return true;
        };
    };
    return false;
};