function join(array, separator) {
    var str = "";
    if (!separator) {
        separator = ",";
    }

    if (array.length === 0) {
        return "";
    }

    for (var i = 0; i < array.length-1; i++) {
        str += array[i] + separator;
    }
    str += array[array.length-1]
    return str;
}