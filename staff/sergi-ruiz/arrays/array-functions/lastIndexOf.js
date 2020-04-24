function lastIndexOf(array, element, fromIndex = array.length - 1) {

    for (var i = fromIndex; i >= 0; i--) {
        if (array[i] === element) {
            return i
        }
    }
    return -1
}