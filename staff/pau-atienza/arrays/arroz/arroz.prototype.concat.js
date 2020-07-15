'use strict'

Object.defineProperty(Arroz.prototype, 'concat', {
    value: function(elements){
        var newArroz = new Arroz();

        for (var i in this) newArroz[newArroz.length++] = this[i]
        var element
        
        for (var j in arguments){
            element = arguments[j];
    
            if (element instanceof Arroz || element instanceof Array)
                for(var y in element)   newArroz[newArroz.length++] = element[y];
    
            else newArroz[newArroz.length++] = element;
        };
        return newArroz;
    },
    enumerable: false,
    writable: true
});