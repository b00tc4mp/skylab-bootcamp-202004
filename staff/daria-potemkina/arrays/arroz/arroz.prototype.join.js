'use strict'

Arroz.prototype.join = function (separator){
    var string = '';

    typeof separator === 'undefined' ? separator = ',' : separator;
    
    for (var i = 0; i < this.length; i++){
        i === this.length - 1 ? string += this[i] : string += this[i] + separator;
    }
    return string;
}