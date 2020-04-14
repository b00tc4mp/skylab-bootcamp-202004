function push(array, ...arguments) {
    var arrLength = array.length
    if (arguments) {
        for (var i = 0; i < [...arguments].length; i++) {
            array[arrLength+i] = [...arguments][i];
        }
    }
    return array.length;
}