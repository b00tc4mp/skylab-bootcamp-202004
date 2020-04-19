'use strict';

function Arroz() {
    if (arguments.length == 1 && typeof arguments[0] == 'number') {
        if (!Number.isInteger(arguments[0])) throw ReferenceError('Invalid arroz length');
        
        else this.length = arguments[0];

    } else {
        if (arguments.length > 0) 
            for (var i in arguments)
                this[i] = arguments[i]

        this.length = arguments.length;
    }
}