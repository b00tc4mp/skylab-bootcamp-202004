function pop(arr) {
    var last = arr[arr.length-1]
    arr.length = arr.length-1;
    return last;
}