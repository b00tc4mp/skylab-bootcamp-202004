'use strict'

Arroz.prototype.pop = function(){
    var aux = this[this.length-1];
    this.length = this.length-1;
    return aux; 
}