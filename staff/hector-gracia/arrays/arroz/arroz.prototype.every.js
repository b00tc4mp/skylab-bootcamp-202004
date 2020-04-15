'use strict';

Arroz.prototype.every= function every(expresion){
    if(typeof expresion!== "function") throw new TypeError("expresion is not a function");
    for(var i=0; i<this.length; i++){
        if(!expresion(this[i],i,this)){
            return false;
        }
    }
    return true;
}