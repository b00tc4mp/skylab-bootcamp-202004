function splice(array, start, deleteCount, ...args) {
    debugger

    var arrChange = []
    var cont = 0;

    for (var i = start; i < start + deleteCount; i++) {

        arrChange[cont] = array[i];
        array.length = array.length - cont
        cont++

    }
    return arrChange
}


