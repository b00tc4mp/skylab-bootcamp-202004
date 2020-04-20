'use strict';

Object.defineProperty(Arroz, 'from', {
    value: function(array,expresion) {
            var result= new Arroz();
        if(typeof array==="undefined"){
            return result;
        }else if(typeof array.length!=="undefined"){
            for(var i=0;i<array.length;i++){
                result.push(array[i]);
            }
            if(typeof expresion==="function"){
                result=result.map(expresion);
            }
            return result;
        }else if(typeof array==="number"){
                result.push(array);
                return result;
        }   
    },
    enumerable: false,
    writable: true
});