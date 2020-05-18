function find(arr, callback) {
    for(var i in arr){
        var returned = callback(arr[i], i, arr)
        if(returned) return true;
    }
    return -1;
}