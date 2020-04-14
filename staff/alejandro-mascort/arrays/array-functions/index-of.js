function indexOf(array, element, startingIndex) {
    if (!startingIndex) {
        startingIndex = 0;
    } else if (startingIndex < 0) {
        startingIndex = startingIndex + array.length;
        
        if (startingIndex < 0) {
            startingIndex = 0;
        }
    }

    for (var i = startingIndex; i < array.length; i++) {
        if (array[i] === element) {
            return i;
        }
    }
    return -1;
}