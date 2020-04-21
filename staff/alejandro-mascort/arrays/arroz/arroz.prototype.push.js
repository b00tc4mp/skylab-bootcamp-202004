'use strict';

Arroz.prototype.push = function(element) {
    if (!element) return this.length;

    this[this.length++] = element;

    if (arguments.length > 1) {
        var arg = [];

        for (var i = 1; i < arguments.length; i ++) arg[arg.length] = arguments[i]

        for (var i = 0; i < arg.length; i++) {
            this[this.length++] = arg[i];
        }
    }
    return this.length;
};
