'use strict';

Arroz.prototype.forEach = function forEach(expresion){
    for(var i=0; i<this.length;i++){
        expresion(this[i],i,this);
    }
};