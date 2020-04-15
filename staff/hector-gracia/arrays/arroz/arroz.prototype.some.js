'use strict';

Arroz.prototype.some= function some(expresion){
    for(var i=0; i<this.length;i++){
        if(expresion(this[i],i,this)){
            return true;
        }
    }
    return false;
}