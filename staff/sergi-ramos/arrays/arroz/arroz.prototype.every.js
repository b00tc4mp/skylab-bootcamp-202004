'use stric'

Object.defineProperty(Arroz.prototype, 'every', {
    value: function (callback) {
if(typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

        var cont = 0;
        for (var i = 0; i < this.length; i++) {
            if (callback(this[i], i, this)) {
                
                if (cont === this.length - 1) {
                    return true;
                }
                cont++;
            }
        }
        return false;
    },
    enumerable: false,
    writable: true
});