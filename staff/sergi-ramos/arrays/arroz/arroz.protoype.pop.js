'use strict'

Object.defineProperty(Arroz.prototype,'pop', {
    value: function () {
       if(this.length > 0){
            var deletedValue = this[this.length - 1];
            delete this[this.length - 1];
            this.length = this.length - 1;

            return deletedValue;
       }else{
           return undefined
       }
    },
    enumerable: false,
    writable: true
});
