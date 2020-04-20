'use strict';

Object.defineProperty(Arroz.prototype, 'join', {
    value: function(separator = ',') {
        var string = this[0];
        if ((separator instanceof Function)) throw new TypeError(separator + ' is  a function');
        if (separator === undefined) separator = "";
        
        for (var i = 1; i < this.length; i++) 
            (this[i] === undefined || this[i] === null) ? 
            string += separator :
            string += separator + this[i].toString()
    
        return string;
    },
    enumerable: false,
    writable: true
});