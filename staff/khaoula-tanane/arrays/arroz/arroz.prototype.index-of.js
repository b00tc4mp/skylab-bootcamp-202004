'use strict';

Arroz.prototype.indexOf = function(string, start){
    
    if (!start) start = 0
     
    for(var i = start; i < this.length; i++){
        if(this[i] === string){
            return i;
        }
    }
    return -1;
} 
