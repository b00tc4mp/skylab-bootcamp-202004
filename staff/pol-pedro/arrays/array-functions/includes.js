function includes(array, cond, index) {
    var i;
    if (typeof index == 'undefined'){
        i = 0;
    }
    else {
        if (index < 0 && array.length + index >= 0) {
            i = index + array.length;
        }
        else if (array.length + index < 0) {
            i = 0;
        }
        else{
            i = index;
        }
    }

    for (i; i < array.length; i++) {
        if (array[i] === cond) {
            return true;
        }
    }
    return false;
}