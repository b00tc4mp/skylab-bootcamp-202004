function indexOf(array, number, position) {
    if(typeof position === 'undefined' || (array.length + position) <= 0 ) {
        for (var i = 0; i < array.length; i++) {
            if(array[i] === number){
                return i;
            }
        }
        return -1
    }
    else {
        if (position >= 0) {
            for (var i = position; i < array.length; i++) {
                if(array[i] === number){
                    return i;
                }
            }
            return -1;
        }
        else{
            var pos = position + array.length;
            for ( pos; pos < array.length; pos++) {
                if(array[pos] === number){
                    return pos;
                }
            }
            return -1;
        }
    }
}