'use strict';
/*
function Arroz() {
    if (arguments.length) {
        for (var i in arguments)
            this[i] = arguments[i]
    }

    this.length = arguments.length;
}
*/

function Arroz() {
    Object.defineProperty(this, 'length', {
        value: 0,
        enumerable: false,
        writable: true
    });

    if (arguments.length === 1) {
        var first = arguments[0]

        if (typeof first === 'number') this.length = first
        else {
            this[0] = first;
            this.length = 1;
        }
    } else if (arguments.length > 1) {
        for (var i in arguments)
            this[i] = arguments[i]

        this.length = arguments.length
    }
}