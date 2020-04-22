'use strict'

Arroz.prototype.find = function find(expression){

    for(var i=0; i< this.length; i++){
        if(expression(this[i])){
            return this[i];
        }
    }
    return undefined;
}