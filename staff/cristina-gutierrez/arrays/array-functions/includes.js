function includes(arr, value, fromIndex) {
    if (fromIndex === undefined) {
        fromIndex = 0;
    };

    for (var i = fromIndex; i < arr.length; i++) {
        if (arr[i] === value){
            return true
        }
    }
    return false
};