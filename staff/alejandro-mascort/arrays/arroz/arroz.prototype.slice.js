'use strict';

Arroz.prototype.slice = function (startingIndex, finishIndex) {
    var newArray = new Arroz();
    startingIndex = startingIndex/1;
    finishIndex = finishIndex/1;
    
    if (isNaN(startingIndex)) {
        startingIndex = 0;

    } else if (startingIndex < 0) {
        startingIndex = startingIndex + this.length;
        
        if (startingIndex < 0) {
            startingIndex = 0;
        }
    }

    if (isNaN(finishIndex)) {
        finishIndex = this.length;

    } else if (finishIndex < 0) {
        finishIndex = finishIndex + this.length-1;
        
        if (finishIndex < 0) {
            finishIndex = this.length;
        }
    }
    finishIndex = Math.floor(finishIndex);
    startingIndex = Math.floor(startingIndex);
    
    for (var i = startingIndex; i < finishIndex; i++) {
        newArray[newArray.length++] = this[i];
    }
    return newArray;

}

