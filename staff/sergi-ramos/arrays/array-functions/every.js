function every(array, callback) { debugger
    var cont = 0;
    for (var i = 0; i < array.length; i++) {
        if (callback(array[i], i, array)) {
            cont++
        }
    }
    if (cont === array.length) {
        return true;
    } else {
        return false;
    }
}
