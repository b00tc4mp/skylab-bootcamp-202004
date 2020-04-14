function pop (array) {
    pop = array[array.length - 1]
    array.length = array.length - 1;
    return pop;
}