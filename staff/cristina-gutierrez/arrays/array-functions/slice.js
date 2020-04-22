function slice(arr, start, end) {
    var newArr = [];

    if (end > arr.length) {
        end = arr.length
    }

    for(var i = start; i < end; i++) {
        newArr.push(arr[i]);
    };
    return newArr;
};