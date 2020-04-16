'use strict';

Arroz.prototype.includes = function(element, start){
    
    if (!start) start = 0 

    if (!element) throw TypeError(`${element} is not a function`);

    for(var i =start; i < this.length; i++){
        if(this[i] === element) return true;
    }
    return false;
} 

