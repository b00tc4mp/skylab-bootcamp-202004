function some(array, condition) {
    for (var i = 0; i < array.length; i++) {
        if (condition(array[i], i, array))
            return true
    }
    return false
}