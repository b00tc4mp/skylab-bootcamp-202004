'use strict';

Arroz.prototype.includes = function(element, startingIndex) {
    startingIndex = startingIndex/1;
    
    if ((typeof startingIndex != 'number') && (isNaN(startingIndex)) || (!startingIndex)) {
        startingIndex = 0;
        
    } else if (startingIndex < 0) {
        startingIndex = startingIndex + this.length;
        
        if (startingIndex < 0) {
            startingIndex = 0;
        }
    }

    for (var i = startingIndex; i < this.length; i++) {
        if (this[i] === element) {
            return true;
        }
    }
    return false;
}