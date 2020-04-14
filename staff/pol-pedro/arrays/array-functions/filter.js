function filter (array, callback) {
    arr = [];
    cont = 0;
    for (var i = 0; i < array.length; i++) {
        if (callback(array[i])){
            arr[cont] = array[i];
            cont++;
        }
    }
    return arr;
};

function callback(arrayI, condition) {

}