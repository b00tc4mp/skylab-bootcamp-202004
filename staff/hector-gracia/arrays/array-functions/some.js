function some(array,expresion){
    for(var i=0;i<array.length;i++){
        if(expresion(array[i])) return true;
    }
    return false;
}