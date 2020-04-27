function splice(array, index, qy, elements) {
    var stanBy = [];
    var erased = [];


    if (qy === 0) {
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

        for (var k = 0; k < qy; k++) {
            stanBy[stanBy.length] = elements[k];
        }

        for (var l = (index + qy); l < array.length; l++) {
            stanBy[stanBy.length] = array[l];
        }
    }

    return stanBy
}