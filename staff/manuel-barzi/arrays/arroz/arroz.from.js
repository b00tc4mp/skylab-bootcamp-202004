'use strict';

Object.defineProperty(Arroz, 'from', {
    value: function(value) {
        var array = new Arroz

        if (value.length) {
            for (var i in value) {
                array.push(value[i])
            }
        }
        
        return array
    },
    enumerable: false,
    writable: true
});