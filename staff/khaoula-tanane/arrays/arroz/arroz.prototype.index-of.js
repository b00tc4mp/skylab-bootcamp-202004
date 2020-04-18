'use strict';

Arroz.prototype.indexOf = function(element, start){
    
    if (!start) start = 0
    if (element === undefined) throw TypeError(`search value is required`);

     
    for(var i = start; i < this.length; i++){
        if(this[i] === element){
            return i;
        }
    }
    return -1;
} 
