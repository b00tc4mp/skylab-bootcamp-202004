"use strict"
Arroz.prototype.every=function(element) {
    /* debugger */
    if (!(element instanceof Function)) throw new TypeError( element + ' is not a function')
    for (var i = 0; i < this.length; i++) {
        if(!element(this[i],i,this))
            return false;
    }
    return true;
}