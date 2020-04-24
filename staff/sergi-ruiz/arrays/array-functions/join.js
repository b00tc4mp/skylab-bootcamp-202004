function join(array, separator) {
    var newString = array[0];
    if (separator === undefined) {
        separator = "";
    }
    for (var i = 1; i < array.length; i++) {
        newString += separator + array[i];

    }
    return newString;
}