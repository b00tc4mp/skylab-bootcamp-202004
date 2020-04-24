function reduce(array, acc) {
    var count = 0
    var current = '';



    for (var i = 0; i < array.length; i++) {
        current = current + array[i];
        count++;
    }
    return current + acc;
}