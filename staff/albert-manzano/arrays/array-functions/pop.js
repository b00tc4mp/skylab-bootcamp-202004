function pop(array) {
    var element = array[array.length - 1];
    array.length = (array.length - 1);
    return element;
}