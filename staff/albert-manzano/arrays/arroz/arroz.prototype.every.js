'use strict'

Arroz.prototype.every = function(expression) {
    if (typeof expression !== 'function') throw TypeError (expression + ' is not a function');
    
    for (var i = 0; i < this.length; i++) {
        if (!expression(this[i], i, this))
            return false
    }
    return true
}  



