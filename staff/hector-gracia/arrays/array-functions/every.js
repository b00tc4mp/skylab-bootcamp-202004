function every(array,expresion){
    for(var i=0;i<array.length;i++){
        if(!expresion(array[i],i,array)) return false;
    }
    return true;
}