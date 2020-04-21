"use strict";

Arroz.prototype.concat = function(array) {
    var result = [];
    if(array instanceof Arroz){
        for (var i = 0; i < (this.length + array.length); i++) {
            if (i < this.length) {
                result[result.length] = this[i];
            } else {
                result[result.length] = array[i - this.length];
            }
        }
    }else {
        for (var i = 0; i < this.length +arguments.length; i++) {
            if (i < this.length) {
                result[result.length] = this[i];
            } else {
                result[result.length] = arguments[i - this.length];
            }
        }
    }
    return result;
}