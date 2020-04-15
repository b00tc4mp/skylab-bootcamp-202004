'use strict';

Arroz.prototype.pop= function pop(expresion){
    var result=new Arroz();
    var last;
    for(var i=0;i<this.length-1;i++){
        result[result.length]=this[i];
        result.length++;
    }
    last=this[this.length-1];
    this[this.length-1]=undefined;
    this.length--;
    return last;
}