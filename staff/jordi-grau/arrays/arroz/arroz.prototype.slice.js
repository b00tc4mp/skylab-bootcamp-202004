'use strict'

Arroz.prototype.slice = function slice(initialIndex, finalIndex){
    var result=[];
        if (initialIndex === undefined){
            initialIndex = 0}
        if (initialIndex < 0){
            initialIndex = this.length + initialIndex;
        }
        if (finalIndex < 0){
            finalIndex = this.length + finalIndex;
        }
        for (var i = initialIndex; i < finalIndex-1; i++){
            result[result.length] = this[i]

        }
    return result;
}
