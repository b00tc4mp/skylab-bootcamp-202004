'use strict';

function indexOf(array, element, index){
    if(arguments.length>2){
        if (index>= array.length){
            return -1
        }
        else{
            var i = index
        }
    }
    else{
        var i = 0
    }

    for(i; i<array.length; i++){
        if (array[i] === element){
            return i;
        };
    };
    return -1;
};