function filter (array, callback) {
    var arr = [];
    var cont = 0;
    for (var i = 0; i < array.length; i++) {
        if (callback(array[i])){
            arr[cont] = array[i];
            cont++;
        }
    }
    return arr;
};
