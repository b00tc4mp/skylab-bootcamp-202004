"use strict";

Arroz.prototype.reverse = function(){
    var result = [];
    for(var i=this.length-1; 0<=i ; i--){
        result[result.length] = this[i];
    }
    for(var i =0; i<result.length;i++){
        this[i]=result[i];
    }

    return result;
}