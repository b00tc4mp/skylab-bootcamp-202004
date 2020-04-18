'use strict';

Object.defineProperty(Arroz.prototype,'map',  {
value: function(expression) {
    if( typeof expression !== 'function') throw new TypeError(expression + ' is not a function')
    var result = new Arroz()

    for (var i = 0; i < this.length; i++)
        result[i] = expression(this[i], i, this);

    result.length = this.length;

    return result;

},
enumerable:false,
writable:true


});