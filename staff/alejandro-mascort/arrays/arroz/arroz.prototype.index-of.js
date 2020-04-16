'use strict';

Arroz.prototype.indexOf = function (element, startingIndex) {
    startingIndex = startingIndex/1;
    
    if (isNaN(startingIndex)) {
        startingIndex = 0;

    } else if (startingIndex < 0) {
        startingIndex = Math.floor(startingIndex);
        startingIndex = startingIndex + this.length;
        
        if (startingIndex < 0) {
            startingIndex = 0;
        }
    }

    for (var i = startingIndex; i < this.length; i++) {
        if (this[i] === element) {
            return i;
        }
    }
    return -1;
}