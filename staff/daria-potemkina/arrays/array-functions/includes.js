'use strict';

function includes(array, element, index){
    if(typeof index === 'undefined'){
    for(var i = 0; i < array.length; i++){
        if(array[i] === element){
            return true;
        }
    }
}else{
    for(var i = index; i < array.length; i++){
        if(array[i] === element){
            return true;
        }
    }
}
    return false
}