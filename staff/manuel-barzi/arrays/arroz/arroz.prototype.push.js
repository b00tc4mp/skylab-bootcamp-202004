'use strict';

Arroz.prototype.push = function() {
    for (var i in arguments)
        this[this.length++] = arguments[i];

    return this.length;
};
