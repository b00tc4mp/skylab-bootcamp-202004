'use strict';

Arroz.prototype.slice = function (start, end) {
    var newArray = [];
    if (start === undefined) start=0
    if (end === undefined) end = this.length;
    for (var i = start; i < end; i++) {
        newArray[newArray.length] = this[i];
    }

    return newArray;
}