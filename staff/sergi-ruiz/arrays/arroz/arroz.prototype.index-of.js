'use strict';

Arroz.prototype.indexOf = function(element, fromIndex) {


    if (isNaN(fromIndex) || typeof fromIndex === "undefined") fromIndex = 0;
    if (!Number.isInteger(fromIndex)) throw new TypeError("fromIndex is not an integer");

    if (!fromIndex) {
        fromIndex = 0;
    }

    if (fromIndex < 0) {
        fromIndex += this.length;
        if (fromIndex < 0) {
            fromIndex = 0;
        }
    }
    for (var i = fromIndex; i < this.length; i++) {
        if (this[i] === element) {
            return i;
        }
    }
    return -1;
};