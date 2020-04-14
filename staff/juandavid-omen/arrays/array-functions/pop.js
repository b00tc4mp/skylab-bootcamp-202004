function pop(array) {
    
    if (array.length-1 < 0) {
        return undefined;
    }
    var lastElement = array[array.length-1]
    array.length -= 1;
    return lastElement;

    // var lastElementIndex = array.length - 1;
    // if (lastElementIndex < 0) {
    //     return undefined;
    // }
    // var lastElement = array[lastElementIndex];
    // array.splice(lastElementIndex, 1);
    // return lastElement;
};