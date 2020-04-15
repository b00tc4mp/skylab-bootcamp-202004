'use strict'

Arroz.prototype.filter= function filter(expresion){
    var arroz= new Arroz();
    for(var i=0;i<this.length;i++){
        if(expresion(this[i],i,this)){
            arroz[arroz.length]=this[i];
            arroz.length++;
        }
    }
    
    return arroz;
}