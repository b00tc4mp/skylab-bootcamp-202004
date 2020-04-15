'use strict';

Arroz.prototype.map= function map(expresion){
    var result=new Arroz();
    for(var i=0;i<this.length;i++){
        result[result.length]=expresion(this[i],i,this);
        result.length++;
    }
    return result;
}