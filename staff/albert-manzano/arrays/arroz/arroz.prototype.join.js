'use strict';

Arroz.prototype.join = function(element) {
    var newString = "" + this[0];
    if ((element instanceof Function)) throw new TypeError(element + ' is  a function');
    if (this.length === 0){
        return ""
    }else if (typeof element === 'undefined') {
        element =",";
    }
    

    for (var i = 1; i < this.length; i++){ 
        if(!(this[i]=== undefined || this[i] === null || this[i] === "")){
            newString += element + this[i];
        }
    }
        
    return newString;
}