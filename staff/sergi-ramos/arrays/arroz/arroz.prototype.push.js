'use strict';

Object.defineProperty(Arroz.prototype, 'push', {
    value:function(...args) {
    
        for(var i = 0; i < args.length;i++){
            this[this.length++] = args[i];
        }
    } ,
    enumerable: false,
    writable: true
});