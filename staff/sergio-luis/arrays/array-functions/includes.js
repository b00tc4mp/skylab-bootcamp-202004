function includes(array, searchElement, fromIndex) {
    if (fromIndex === undefined) {
        fromIndex = 0;
    }

    for (var i = fromIndex; i < array.length; i++) {
        if (array[i] === searchElement)
            return true;
    }
    return false
}