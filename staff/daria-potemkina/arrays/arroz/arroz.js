'use strict';

function Arroz() {
    if (arguments.length) {
        for (var i in arguments)
            this[i] = arguments[i]
    }

    this.length = arguments.length;

    // if(arguments.length === 1 && typeof arguments[0] === 'number'){

    // for (var i = 0; i < arguments[0]; i++){
    //     this[i]=undefined;
    // }
    // this.length = arguments[0];
    // }
}

