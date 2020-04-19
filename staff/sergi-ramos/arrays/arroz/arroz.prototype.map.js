'use strict'

Object.defineProperty(Arroz.prototype,'map', {
    value: function(callback) {
if(typeof callback !==  'function') throw new TypeError(callback + ' is not a function');

        var mappedArray = [];
        for(var i = 0; i < this.length; i++){
           var result =  callback(this[i]);
           mappedArray[i] = result;
        }
    
        return mappedArray;
    },
    enumerable: false,
    writable: true
});













