function indexOf(array, element, index) {

    if (typeof index === 'undefined') {
        for (var i = 0; i < array.length; i++) {
            if (array[i] === element) {
                return i
            }
        }
    } else {
        for (var i = index; i < array.length; i++) {
            if (array[i] === element) {
                return i
            }
        }
    } return -1
}