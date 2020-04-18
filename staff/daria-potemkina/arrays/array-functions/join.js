'use strict'

function join (array, separator){
    var string = '';

    typeof separator === 'undefined' ? separator = ',' : separator;
    
    for (var i = 0; i < array.length; i++){
        i === array.length - 1 ? string += array[i] : string += array[i] + separator;
    }
    return string;
}