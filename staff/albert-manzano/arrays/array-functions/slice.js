
function slice(array, start, end) {
    var newArray = [];
    if (end === undefined) end = array.length;
    for (var i = start; i < end; i++) {
        newArray[newArray.length] = array[i];
    }

    return newArray;
}