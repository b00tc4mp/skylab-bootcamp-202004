function indexOf(array, element, index) {
    if(isNaN(index)){
        index = 0;
        for(var i=0; i<array.length; i++){
            if(element == array[i]){
                return i;
            } else {
                if(i==array.length-1){
                    return -1;
                }
            }
        }
    } else {
        var acc=0;
        for(index; index<array.length; index++){
            acc++;
            if(element == array[index]){
                return acc-1;
            } else {
                if(index==array.length-1){
                    return -1;
                }
            }
        }
    }
}
