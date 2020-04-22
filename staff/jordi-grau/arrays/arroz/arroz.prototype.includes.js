'use strict'

Arroz.prototype.includes = function includes(searchElement, fromIndex) {
    if (fromIndex === undefined) {
        fromIndex = 0;
    }

    for (var i = fromIndex; i < this.length; i++) {
        if (this[i] === searchElement)
            return true;
    }
    return false
}