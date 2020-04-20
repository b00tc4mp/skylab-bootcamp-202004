'use strict'

Arroz.prototype.includes = function (element, index){
    typeof index === 'undefined' ? index = 0 : index;
    for (var i = index; i < this.length; i++){
        if (this[i] === element) return true;
    }
    return false;
}