function lastIndexOf(array, element, startingIndex) {
    if (!startingIndex || startingIndex >= array.length) {
        startingIndex = array.length-1;
    } else if (startingIndex < 0) {
        startingIndex = startingIndex + array.length;
        
        if (startingIndex < 0) {
            return -1;
        }
    }

    for (var i = array.length-1; i >= startingIndex; i--) {
        if (array[i] === element) {
            return i;
        }
    }
    return -1;
}