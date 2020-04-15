'use strict';

Arroz.prototype.find= function find(expresion){
    for(var i=0;i<this.length;i++){
        if(expresion(this[i],i,this)){
            return this[i];
        }
    }
    return undefined;
}