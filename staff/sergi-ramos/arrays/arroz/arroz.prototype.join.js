'use strict'


Object.defineProperty(Arroz.prototype, 'join', {
    value: function (separator) {
        var string = '';
        if (arguments.length === 0) {
            separator = ', ';
        } else if (typeof separator !== 'string') {
            separator = String(separator);
        }
        for (var i = 0; i < this.length; i++) {
            if (i < this.length - 1) {
                string = string + String(this[i]) + separator;
            } else {
                string = string + String(this[i])
            }
        }
        return string;
    },
    enumerable: false,
    writable: true
});