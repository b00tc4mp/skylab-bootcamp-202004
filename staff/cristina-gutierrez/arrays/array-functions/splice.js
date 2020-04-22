function splice(arr, start, deleteCount, element) {
    var newArr = [];
    var end = start + deleteCount;

    for(var i = start; i < end; i++) {
       newArr.push(arr[i]) 
    };
    arr.push(element)
    return newArr;
};