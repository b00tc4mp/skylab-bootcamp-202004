'use strict'

Object.defineProperty(Arroz.prototype, 'splice', {
    value: function (start, deleteCount, ...args) {

        var array = [];
        var cont = 0;
        var thisLength = this.length;
        var countArgs = 0;

        if (arguments.length === 1) {

            if (Math.sign(start) === -1) {
                start = start + this.length;
                for (var i = start; i < this.length; i++) {
                    array[cont] = this[i];
                    delete this[i];

                    cont++;
                }
                this.length = this.length - cont;

            } else {

                for (var i = start; i < this.length; i++) {
                    array[cont] = this[i];
                    delete this[i];
                    cont++;
                }
                this.length = this.length - cont;
            }
        } else if (arguments.length === 2) {

            for (var i = start; i < start + deleteCount; i++) {
                array[cont] = this[i];
                delete this[i];
                cont++;
            }
            this.length = this.length - cont;


            for (var i = 0; i < this.length; i++) {
                var countUndefined = i;

                if (typeof this[i] === "undefined") {

                    for (var x = countUndefined; x != 100; x++) {

                        if (typeof this[x] !== 'undefined') {
                            this[countUndefined] = this[x];
                            delete this[x];

                            countUndefined++;
                        }
                    }
                }
            }
        } else if (arguments.length > 2) {
            for (var i = start; i < start + deleteCount; i++) {

                array[cont] = this[i];

                delete this[i];
                cont++;

            }

            this.length = this.length - cont;
            for (var y = thisLength - 1; y !== 100; y--) {
                if (typeof this[y] !== 'undefined') {
                    this[y + (args.length - deleteCount)] = this[y];
                    if (args.length - deleteCount !== 0) {
                        delete this[y];
                    }
                } else {
                    y = 101
                }
            }
            for (var i = 0; i < this.length; i++) {
                var countUndefined = i;

                if (typeof this[i] === "undefined") {

                    this[i] = args[countArgs];
                    countArgs++;
                    this.length = this.length + 1;
                };
            };
        };
        return array;
    },
    enumerable: false,
    writable: true
});