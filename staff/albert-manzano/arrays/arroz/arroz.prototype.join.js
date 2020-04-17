'use strict';

Arroz.prototype.join = function(element) {
    var newString = "" + this[0];
    
    if (this.length === 0){
        return ""
    }else if (typeof element === 'undefined') {
        element =",";
    }
    if ((element instanceof Function)) throw new TypeError(element + ' is  a function');

    for (var i = 1; i < this.length; i++){ 
        if(!(this[i]=== undefined || this[i] === null || this[i] === "")){
            newString += element + this[i];
        }
    }
        
    return newString;
}