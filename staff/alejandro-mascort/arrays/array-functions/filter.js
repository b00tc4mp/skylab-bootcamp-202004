function filter(arr, callback) {
    var newArray = [];
    for(var i = 0; i < arr.length; i++) {
        if (callback(arr[i], i, arr)) {
            newArray[newArray.length] = arr[i];
        }
    }
    return newArray;
}


