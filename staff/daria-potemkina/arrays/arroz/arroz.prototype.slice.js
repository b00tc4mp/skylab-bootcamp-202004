'use strict';

Arroz.prototype.slice = function (elem1, elem2) {
    if(!Arroz instanceof Arroz) throw new TypeError(Arroz.prototype.slice + 'is not a function');
    
    var result = new Arroz();
    
    if (typeof elem1 === 'undefined' && typeof elem2 === 'undefined') {
        for (var i = 0; i < this.length; i++) {
            result.push(this[i]);
        }
    } else if (typeof elem2 === 'undefined' && elem1 < 0) {
        var num = this.length + elem1;
        if (Math.abs(elem1) < this.length) {
            for (var i = num; i < this.length; i++) {
                result.push(this[i]);
            }
        } else {
            for (var i = 0; i < this.length; i++) {
                result.push(this[i]);
            }
        }
    } else if (typeof elem2 === 'undefined') {
        for (var i = elem1; i < this.length; i++) {
            result.push(this[i]);
        }
    } else if (elem1 > 0 && elem2 > 0) {
        for (var i = elem1; i < elem2; i++) {
            result.push(this[i]);
        }
    } else if (elem1 > 0 && elem2 < 0) {
        var num = this.length + elem2-1;
        for (var i = elem1; i <= num; i++) {
            result.push(this[i]);
        }
    }

    return result;
}