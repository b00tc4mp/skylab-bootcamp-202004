function indexOf(array, element, index){
    var i = 0;
    
    if(arguments.length>2){
        if (index>= array.length){
            return -1
        } else{
            i = index
        }
    }

    for(i; i<array.length; i++){
        if (array[i] === element){
            return i;
        };
    };
    return -1;
};