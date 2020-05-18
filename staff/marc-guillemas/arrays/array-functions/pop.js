function pop(arr) {

    var last = arr[arr.lenght-1];
    arr.length = arr.length-1;

    return last;
}