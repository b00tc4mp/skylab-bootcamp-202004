'use strict'

Arroz.prototype.splice = function(start, deleteCount, args) {
    console.log(arguments.lenght)
    var start = arguments[0];
    var deleteCount = arguments[1];
    var result = [];
    var auxiliar =[];

    // first argument
    if (typeof start !== 'undefined' && typeof start === 'number') {
        if (start > 0) {
            for (var i = 0; i < this.length; i++) {
                result[result.length] = this[i];
            }

            // for (var j = this.length; j > start; j--){
            //     delete this[j];
            //     this.length--
            // }
        } else {
            for (var i = this.length + start; i < this.length; i++) {
                result[result.length] = this[i];
            }
            
            // for (var j = this.length; j > (-start); j--){
            //     delete this[j];
            //     this.length--
            // }
        }
    }

    return result;
}