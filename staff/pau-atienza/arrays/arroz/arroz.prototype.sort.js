'use strict'

Object.defineProperty(Arroz.prototype, 'sort', {
    value: function(expression){
        if(!(expression instanceof Function) && typeof expression !== 'undefined') throw new TypeError(expression + ' is not a function');
        
        if (expression === undefined){
            expression = function(a, b){
                if(a.toString() > b.toString()) return 1;
                else if (a.toString() < b.toString()) return -1;
                else return 0;
            };
        };

        var change = true;
        while(change === true){
            change = false;

            for (var i = 0; i<this.length-1; i++){
                if (expression(this[i], this[i+1]) > 0){
                    var k = this[i];

                    this[i] = this[i+1];
                    this[i+1] = k;
                    change = true;
                };
            };
        };
    },
    enumerable: false,
    writable: true
});


