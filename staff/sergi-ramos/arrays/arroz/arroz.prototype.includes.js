'use strict'

Object.defineProperty(Arroz.prototype, 'includes', {
    value: function (element, position) {

        if (position === undefined) {
            position = 0;
        }
        if (Math.sign(position) === -1) {
            position = position * -1
            var cont = 0;
            for (var i = this.length - 1; i > 0; i--) {
                if (element === this[i] && position > cont) {
                    return true;
                }
                cont++;
            }
            return false;
        } else {
            for (var i = position; i < this.length; i++) {
                if (this[i] === element) 
                    return true;
                
            }
            return false;
        }
    },
    enumerable: false,
    writable: true
});