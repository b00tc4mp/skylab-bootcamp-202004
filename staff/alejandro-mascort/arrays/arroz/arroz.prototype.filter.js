'use strict';

Arroz.prototype.filter = function (callback) {
    if (typeof callback !== 'function' ) throw new TypeError (callback + ' is not a function');

    var newArray = [];
    for(var i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            newArray[newArray.length] = this[i];
        }
    }
    return newArray;
}


