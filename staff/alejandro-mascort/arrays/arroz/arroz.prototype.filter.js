'use strict';

Arroz.prototype.filter = function (callback) {
    var newArray = [];
    for(var i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            newArray[newArray.length] = this[i];
        }
    }
    return newArray;
}


