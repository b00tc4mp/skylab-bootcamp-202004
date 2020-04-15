'use strict';

Arroz.prototype.forEach = function forEach(expresion){
    if(typeof expresion!== "function") throw new TypeError("expresion is not a function");
    for(var i=0; i<this.length;i++){
        expresion(this[i],i,this);
    }
};