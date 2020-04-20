'use strict';
//Generates and returns a new array whose values are the same as the arroz
Arroz.prototype.toArray=function(){
    var result= new Array();
    for(var i=0;i<this.length;i++){
        result[result.length]=this[i];
    }
    return result;
}