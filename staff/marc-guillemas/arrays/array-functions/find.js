//TODO

function find(arr, callback) {
    for(var i in arr){
        var returned = callback(arr[i], i, arr)
        if(returned) return arr[i];
    }
    return -1;
}