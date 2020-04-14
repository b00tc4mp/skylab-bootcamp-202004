function map(array, expresion){
    var newArray=[];
    for(var i=0;i<array.length;i++){
        newArray[i]=expresion(array[i],i,array);
    }

    return newArray;
}