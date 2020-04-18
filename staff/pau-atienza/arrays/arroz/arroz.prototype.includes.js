'use strict'

Object.defineProperty(Arroz.prototype, 'includes', {
    value: function (element, index = 0) {

        if (index >= this.length) {
            return false
        } else if (index < 0) {
            index = this.length + index;
            if(index < 0) index = 0;
        }
    
        for (index; index < this.length; index++) {
            if (element instanceof Object) {
              if (element === this[index]) return true;
            } else if (element + "" === this[index] + "") {
              return true;
            }
        }
        return false;
    },
    enumerable: false,
    writable: true
});