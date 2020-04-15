'use strinct';

function flat(array, depth = 1, newArray = []){
    depth--;
    for(var i =0; i<array.length; i++){
        if (array[i] === undefined){
            continue
        }
        else if(depth<0){
            newArray[newArray.length] = array[i];
        }
        else if (typeof array[i] !== 'object'){   
            newArray[newArray.length] = array[i];
        }
        else{
            flat(array[i], depth, newArray);
        };
    };
    return newArray;
};