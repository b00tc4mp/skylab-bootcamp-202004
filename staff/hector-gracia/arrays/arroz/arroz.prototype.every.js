'use strict';

Arroz.prototype.every= function every(expresion){
    for(var i=0; i<this.length; i++){
        if(!expresion(this[i],i,this)){
            return false;
        }
    }
    return true;
}