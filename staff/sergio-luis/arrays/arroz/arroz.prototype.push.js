'use strict';

Arroz.prototype.push = function () {
    if(arguments.length === 0) return undefined;
    var length = this.length;
    for (let i = 0; i <arguments.length; i++) {
        this[this.length++] = arguments[i];
        length++;
    }
    return length;
}