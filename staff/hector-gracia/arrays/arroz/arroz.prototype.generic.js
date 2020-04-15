'use strict';
//Creates and returns a new arroz of a specified length and fills it with values equal as its index+1      [1,2,3,4,...,length]
Arroz.prototype.generic=function(length){
    if(!Number.isInteger(length)) throw new TypeError("length is not an integer");
    var result=new Arroz();
    for(var i=0; i<length;i++){
        result[result.length++]=i+1;
    }
    return result;
}