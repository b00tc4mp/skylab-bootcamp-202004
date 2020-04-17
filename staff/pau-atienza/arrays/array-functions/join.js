'use strict';

function join(array, separator = ','){
    var string = array[0];

    for (var i=1; i<array.length; i++){

        (array[i] === undefined || array[i] === null) ? 
        string += separator :
        string += separator + array[i].toString()
    };
    return string;
};