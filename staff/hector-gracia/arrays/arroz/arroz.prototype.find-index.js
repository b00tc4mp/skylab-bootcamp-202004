'use strict'

Arroz.prototype.findIndex= function findIndex(expresion){
    for(var i=0;i<this.length;i++){
        if(expresion(this[i],i,this)){
            return i;
        }
    }
    return-1;
}