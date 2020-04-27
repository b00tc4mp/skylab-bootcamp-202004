'use strict'

Arroz.prototype.pop = function pop() {
    
    var element = this[this.length - 1];
    this.length = this.length - 1;
    return element;
}