"use strict"

Arroz.prototype.sort = function(expression) {
    if (typeof expression !== "undefined") throw new TypeError('need to be undefined at Arroz.sort');
    for (var i = 0; i < this.length; i++) {
        for (var j = 0; j < this.length - i; j++) {
            if (this[j] > this[j + 1]) {
                var aux = this[j + 1];
                this[j + 1] = this[j];
                this[j] = aux;
            }
        }
    }
}