'use strict'

Object.defineProperty(Arroz.prototype, 'flat', {
    value: function (depth = 1, newArroz = new Arroz ()){ 
        if (typeof (depth+1) !== 'number')  depth = 0;
    
        depth--;
        for(var i =0; i<this.length; i++){
            if (this[i] === undefined){
                continue
            }
            else if(depth<0){
                newArroz[newArroz.length++] = this[i];
            }
            else if (typeof this[i] !== 'object'){   
                newArroz[newArroz.length++] = this[i];
            }
            else{
                this[i].flat(depth, newArroz);
            };
        };
        return newArroz;
    },
    enumerable: false,
    writable: true
});