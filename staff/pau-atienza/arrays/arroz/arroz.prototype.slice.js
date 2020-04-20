'use strict';

Arroz.prototype.slice = function (start = 0, end = this.length) {
    var newArroz = new Arroz();

    if(start <0) start = this.length + start; 
    if(start<0) start = 0;

    if(end<0) end = this.length + end; 
    if(end<0) end = 0;

    for (var i = start; i < end; i++) {
        newArroz[newArroz.length++] = this[i];
    }

    return newArroz;
}

Object.defineProperty(Arroz.prototype, 'slice', {
    value: function (start = 0, end = this.length) {
        var newArroz = new Arroz();
    
        if(start <0) start = this.length + start; 
        if(start<0) start = 0;
    
        if(end<0) end = this.length + end; 
        if(end<0) end = 0;
    
        for (var i = start; i < end; i++) {
            newArroz[newArroz.length++] = this[i];
        }
    
        return newArroz;
    },
    enumerable: false,
    writable: true
});