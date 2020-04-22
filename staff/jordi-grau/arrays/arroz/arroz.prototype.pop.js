'use strict'

Arroz.prototype.pop = function pop(){
    if(this.length===0){
        return undefined;
    }
    var lastIndex = this.length-1;
    var lastPosition = this[lastIndex];
    this.length = this.length-1;
    return lastPosition; 
}

