function join(array, separator) {

    var newString = ''
    for (var i = 0; i < array.length; i++) {
        if(array.length - 1 !==  i)
        newString += array[i] + separator
    }
    newString += array[array.length - 1]
    return newString;
}
