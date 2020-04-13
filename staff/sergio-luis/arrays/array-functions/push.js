function push(array, elements) {
    var arrElements = [elements];

    for (let i = 0; i < arrElements.length; i++) {
        array[array.length] = arrElements[i]
    }

}