'use strict';

Arroz.prototype.join = function(element) {
    var newString = this[0];
    if ((element instanceof Function)) throw new TypeError(element + ' is  a function');
    if (element === undefined) element = "";
    
    for (var i = 1; i < this.length; i++) 
        newString += element + this[i];

    return newString;
}