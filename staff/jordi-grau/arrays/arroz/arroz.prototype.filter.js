'use strict'

Arroz.prototype.filter= function filter(expresion) {
    var result = [];
    for (var i = 0; i < this.length; i++) {
        if(expresion(this[i])){
            result[result.length]= this[i]
        };
    }
    if(result.length===0){
        return -1
    }else{
        return result;
    }
    
}