function splice(array, index, deleteCount, elements) {
    debugger
    var stanBy = [];
    var erased = [];


    var array1 = [1, 2, 3]
    var elements = [4, 5]

    if (qy === 0) { // no borrando
        for (var i = 0; i < index; i++) {

            stanBy[stanBy.length] = array[i];
        }

        for (var j = 0; j < elements.length; j++) {
            stanBy[stanBy.length] = elements[j];
        }

        for (var k = index; k < array.length; k++) {
            stanBy[stanBy.length] = array[k];
        }

        return stanBy

    } else {

        for (var i = 0; i < index; i++) {
            stanBy[stanBy.length] = array[i];
        }
        for (var j = index; j < (index + qy); j++) {
            erased[erased.length] = array[j];
        }

        for (var k = 0; k < deleteCount; k++) {
            stanBy[stanBy.length] = elements[k];
        }

        for (var l = (index + qy); l < array.length; l++) {
            stanBy[stanBy.length] = array[l];
        }
    }

    return stanBy
}