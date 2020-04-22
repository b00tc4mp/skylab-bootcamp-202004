function slice(array, startingIndex, finishIndex) {
    var newArray = [];
    var index = 0;
    
    if (!startingIndex) {
        startingIndex = 0;
    } else if (startingIndex < 0) {
        startingIndex = startingIndex + array.length;
        
        if (startingIndex < 0) {
            startingIndex = 0;
        }
    }

    if (!finishIndex) {
        finishIndex = array.length;
    } else if (finishIndex < 0) {
        finishIndex = finishIndex + array.length-1;
        
        if (finishIndex < 0) {
            finishIndex = array.length;
        }
    }
    
    for (var i = startingIndex; i < finishIndex; i++) {
        newArray[index] = array[i];
        index++;
    }
    return newArray;

}

