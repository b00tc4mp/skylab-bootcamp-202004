function findIndex(arr, callback) {
    for(var i in arr){
        var returned = callback(arr[i], i, arr)
        if(returned) return i;
    }
    return -1;
}