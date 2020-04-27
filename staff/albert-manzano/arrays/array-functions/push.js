function push(array, element) {
    for (var i = 0; i < element.length; i++) {
        array[array.length] = element[i];
    }
}