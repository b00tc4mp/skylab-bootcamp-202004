'use strict';

Object.defineProperty(Arroz.prototype, 'push', {
    value: function(element) {
        for (var i = 0; i < arguments.length; i++){
            this[this.length++] = arguments[i];
    
        }   
    }
});