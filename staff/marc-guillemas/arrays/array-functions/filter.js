function filter(arr, callback) {
    var newArray = [];
    var index = 0;
    for(var i = 0; i < arr.length; i++) {
        if (callback(arr[i], i, arr)) {
            newArray[index] = arr[i];
            index++;
        }
    }
    return newArray;
}

