'use strict';

function Arroz() {

    Object.defineProperty(this, 'length', {
        value: 0,
        enumerable: false,
        writable: true
    });

    if (arguments.length === 1 && typeof arguments[0] === 'number') {
        
        this.length = arguments[0];
    }
    else{
        for (var i in arguments){
            this[this.length++] = arguments[i]
        }
    }
}