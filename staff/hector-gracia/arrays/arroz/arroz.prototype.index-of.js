'use strict'

Arroz.prototype.indexOf= function(element,fromIndex){
    if(isNaN(fromIndex)||typeof fromIndex==="undefined") fromIndex=0;
    if(!Number.isInteger(fromIndex)) throw new TypeError("fromIndex is not an integer");

    for(var i=fromIndex;i<this.length;i++){
        if(this[i]===element) return i;
    }
    return -1;
}