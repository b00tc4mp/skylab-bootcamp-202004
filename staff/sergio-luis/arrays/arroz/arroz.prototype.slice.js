"use strict"

Arroz.prototype.slice = function slice(initialIndex = 0, finalIndex){
    var result=[];
    
    if (initialIndex < 0){
        initialIndex = this.length + initialIndex;
    }
    if (finalIndex < 0){
        finalIndex = this.length + finalIndex;
    }
    for (var i = initialIndex; i < finalIndex-1; i++){
        result[result.length] = this[i];

    }
return result;
}
