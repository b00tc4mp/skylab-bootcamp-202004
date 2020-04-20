'use strict';

Arroz.prototype.push= function push(){
    for(var i=0; i<arguments.length;i++){
        this[this.length]=arguments[i];
        this.length++;
    }
    return this.length;
}