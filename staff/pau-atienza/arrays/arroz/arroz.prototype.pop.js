'use strict'

Object.defineProperty(Arroz.prototype, 'pop', {
    value: function pop() {
    
        if (this.length === 0) return undefined; 
        
        var element = this[--this.length];
        delete this[this.length];
    
        return element;
    },
    enumerable: false,
    writable: true
});