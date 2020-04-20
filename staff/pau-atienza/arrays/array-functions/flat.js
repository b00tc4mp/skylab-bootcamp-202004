'use strict';

function flat(array, depth = 1, newArray = []){ 
    if (typeof (depth+1) !== 'number')  depth = 0;

    depth--;
    for(var i =0; i<array.length; i++){
        if (array[i] === undefined){
            continue
        }
        else if(depth<0){
            newArray[newArray.length] = array[i];
        }
        else if (!(array[i] instanceof Array)){   
            newArray[newArray.length] = array[i];
        }
        else{
            flat(array[i], depth, newArray);
        };
    };
    return newArray;
};