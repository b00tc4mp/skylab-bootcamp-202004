'use strict'

Arroz.prototype.indexOf = function (element, index) {
    typeof index === 'undefined' || typeof index === 'string' ? index = 0 : index;

    for(var i = index; i < this.length; i++){
        if(this[i] === element) return i;
    }
        return -1;
    }