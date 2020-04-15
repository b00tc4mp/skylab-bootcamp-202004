"use strict";

Arroz.prototype.join = function(separator = ',') {
    
    var string = this[0];
    for (var i = 1; i < this.length; i++) {
        string += separator;
        if (this[i] !== undefined && this[i] !== null) {
          string += this[i].toString();
        };
        
    };
    return string;
};