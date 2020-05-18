'use strict';

Arroz.prototype.push = function(...args) {
    for(var i = 0; i < args.length;i++){
        this[this.length++] = args[i];
    }
};
