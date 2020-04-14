function pop(array) {
    var last = array[array.length-1]
    array.length = array.length-1;
    return last;
}