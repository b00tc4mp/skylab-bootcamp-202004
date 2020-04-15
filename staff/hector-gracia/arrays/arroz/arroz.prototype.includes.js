'use strict'

Arroz.prototype.includes= function(element,fromIndex){
    if(isNaN(fromIndex)||typeof fromIndex==="undefined") fromIndex=0;
    for(var i=fromIndex;i<this.length;i++){
        if(this[i]===element) return true;
    }
    return false;
}