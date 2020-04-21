'use strict';

Arroz.prototype.splice = function (startingIndex, deleteCount) {
    var copyArray = new Arroz();
    var newArray = new Arroz();
    var startArray = new Arroz();

    startingIndex = startingIndex/1;
    
    if (isNaN(startingIndex)) {
        startingIndex = 0;

    } else if (startingIndex < 0) {
        startingIndex = startingIndex + this.length;
        
        if (startingIndex < 0) {
            startingIndex = 0;
        }
    }
    startingIndex = Math.floor(startingIndex);

    if (deleteCount < 0) deleteCount = 0;
    else if (deleteCount > this.length || !Number.isInteger(deleteCount)) deleteCount = this.length;

    for (var i = 0; i < startingIndex; i++) startArray[startArray.length++] = this[i];

    for (var i = startingIndex + deleteCount; i < this.length; i++) copyArray[copyArray.length++] = this[i];

    for (var i = startingIndex; i < startingIndex + deleteCount; i++) newArray[newArray.length++] = this[i];

    for (var i = 2; i < arguments.length; i++) startArray[startArray.length++] = arguments[i]; 

    for (var i = 0; i < copyArray.length; i++) startArray[startArray.length++] = copyArray[i];

    for (var i = 0; i < this.length; i++) delete this[i];

    for (var i = 0; i < startArray.length; i++) this[i] = startArray[i];

    this.length = startArray.length;

    return newArray;
}