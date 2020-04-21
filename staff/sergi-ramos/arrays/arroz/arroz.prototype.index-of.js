'use strict'

Object.defineProperty(Arroz.prototype, 'indexOf', {
    value: function (element, index) {
        if (index === undefined) {
            index = 0
        }
        if (Math.sign(index) === -1) {
            index = index * -1
            var cont = 0
            for (var i = this.length - 1; i > 0; i--) {
                
                if (element === this[i] && index > cont ) {
                    
                    return i;
                }
                cont++
            }
            return -1;
        } else {
            for (var i = index; i < this.length; i++) {
                if (element === this[i])
                    return i
            }
        }
        return -1
    },
    enumerable: false,
    writable: true
});