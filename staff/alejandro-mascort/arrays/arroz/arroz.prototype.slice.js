'use strict';

Arroz.prototype.slice = function (startingIndex, finishIndex) {
    var newArray = new Arroz();
    
    if (!startingIndex) {
        startingIndex = 0;
    } else if (startingIndex < 0) {
        startingIndex = startingIndex + this.length;
        
        if (startingIndex < 0) {
            startingIndex = 0;
        }
    }

    if (!finishIndex) {
        finishIndex = this.length;
    } else if (finishIndex < 0) {
        finishIndex = finishIndex + this.length-1;
        
        if (finishIndex < 0) {
            finishIndex = this.length;
        }
    }
    
    for (var i = startingIndex; i < finishIndex; i++) {
        newArray[newArray.length++] = this[i];
    }
    return newArray;

}

