function filter (array, callback) {
    var arr = [];
    for (var i = 0; i < array.length; i++) {
        if (callback(array[i])){
            arr.push(array[i]);
        }
    }
    return arr;
};
