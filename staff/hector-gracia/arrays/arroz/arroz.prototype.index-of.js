'use strict'

Arroz.prototype.indexOf= function(element,fromIndex){
    if(isNaN(fromIndex)||typeof fromIndex==="undefined") fromIndex=0;
    for(var i=fromIndex;i<this.length;i++){
        if(this[i]===element) return i;
    }
    return -1;
}