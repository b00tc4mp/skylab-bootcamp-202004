"use strict";

Arroz.prototype.splice = function(start, deleteCount) { 
    if (typeof start !== 'number') {
        throw new TypeError(start + ' must be numeric');
    }
    if (arguments.length == 2 && typeof deleteCount !== 'number') {
        throw new TypeError(deleteCount + ' must be numeric');
    }
    if(start > this.length) {
        start = this.length;
        deleteCount = 0;
    } else if(start < 0) {
        start = this.length + start

        if(start < 0) {
            start = 0;
        };
    }

    if(arguments.length < 2 || this.length - start < deleteCount) {
        deleteCount = this.length - start;
    }

    if(deleteCount < 0) {
        deleteCount = 0;
    }

    var newArray = [];

    for(var i = 0; i < start; i++) {
        newArray[newArray.length] = this[i];
    }

    if(arguments.length > 2) {
        for(var i = 2; i < arguments.length; i++) {
            newArray[newArray.length] = arguments[i];
        }
    }

    for(var i = start + deleteCount; i < this.length; i++) {
        newArray[newArray.length] = this[i];
    }
    
    this.length = 0;
    for(var i =0; i < newArray.length; i++) {
        this[this.length++] = newArray[i]
    }
};

