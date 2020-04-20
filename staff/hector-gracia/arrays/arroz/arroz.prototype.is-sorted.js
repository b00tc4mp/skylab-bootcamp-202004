'use strict'
//Method that checks if the arroz is shorted //TODO mayor to minor sorting
Arroz.prototype.isSorted= function(){
    for(var j=0;j<this.length;j++){
        if(typeof this[j]!=="number") throw new TypeError("not all elements in the arroz are numbers");
    }
    for(var i=1;i<this.length-1;i++){
        if(this[i-1]<this[i]===false || this[i]<this[i+1]===false){
            return false;
        }
    }
    return true;
}
