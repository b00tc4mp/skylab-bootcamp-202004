function push(array) {
    for (let i = 1; i < arguments.length; i++) {
        array[array.length] = arguments[i];
    }
}