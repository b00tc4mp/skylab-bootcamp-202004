function push(array) {
  for (let i = 1; i < arguments.length; i++) {
    array[array.length] = arguments[i];
  }
}

arr = [1, 2, 3, 4, 5];
