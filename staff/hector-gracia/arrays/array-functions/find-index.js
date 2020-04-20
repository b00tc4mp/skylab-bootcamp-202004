function findIndex(array, condition){
    for(var i=0;i<array.length;i++){
        if(condition(array[i],i,array))return i;
    }
    return -1;
}