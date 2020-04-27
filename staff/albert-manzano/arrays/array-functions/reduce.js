function reduce(array, acc) {
    var current = 0;

    for (var i = 0; i < array.length; i++) {
        current = current + array[i];
        count++;
    }
    return current + acc;
}