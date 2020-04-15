'use strict'

Arroz.prototype.filter= function filter(expresion){
    if(typeof expresion!== "function") throw new TypeError("expresion is not a function");
    var arroz= new Arroz();
    for(var i=0;i<this.length;i++){
        if(expresion(this[i],i,this)){
            arroz[arroz.length]=this[i];
            arroz.length++;
        }
    }
    
    return arroz;
}