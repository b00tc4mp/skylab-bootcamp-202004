function includes(arr, value, startingIndex) {
    if(startingIndex < 0){
        startingIndex = arr.length + startingIndex;
    }
    if(startingIndex > arr.length){
        return false;
    }

    for(var i = startingIndex; i < arr.length; i++) {
        if(arr[i] === value) {
            return true;
        }
    }
    return false;
}