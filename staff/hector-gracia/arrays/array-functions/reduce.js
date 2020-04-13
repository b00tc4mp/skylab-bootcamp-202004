function reduce(array,expresion){
    var total=0;
    for(var i=0;i<array.length;i++){
        total=expresion(total,array[i]);
    }
    return total;
}