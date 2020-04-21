'use strict'

Object.defineProperty(Arroz.prototype, 'slice', {

    value: function (start, end) {
        var array = new Array();
        var cont = 0;
        if (Math.sign(start) === -1 && Math.sign(end) === -1) {

            start = start + this.length
            end = end + this.length
            var cont = 0
            for (var i = start; i < end; i++) {

                array[cont] = this[i];
                cont++
            }
        }
        else if (Math.sign(start) === -1) {
            if (arguments.length === 1) {
                start = start + this.length;
                for (var i = start; i < this.length; i++) {
                    array[cont] = this[i];
                    cont++;
                }
            }
            else {
                start = start + this.length;
                var cont = 0;
                for (var i = start; i < end; i++) {

                    array[cont] = this[i];
                    cont++;
                }
            }
        } else if (Math.sign(end) === -1) {
            end = end + this.length;
            var cont = 0;
            for (var i = start; i < end; i++) {

                array[cont] = this[i];
                cont++;
            }
        }
        else {
            if (arguments.length === 1) {
                
                for (var i = start; i < this.length; i++) {
                    array[cont] = this[i];
                    cont++;
                }
            } else {
                for (var i = start; i < end; i++) {
                    array[cont] = this[i];
                    cont++;
                };
            };
        };
        return array;
    },
    enumerable: false,
    writable: true
});


