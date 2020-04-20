function filter(array,expresion){
    var filtered=[];
    for(var i=0;i<array.length;i++){
        if(expresion(array[i],i,array,array[i]))
        filtered[filtered.length]=array[i]
    }
    return filtered;
} 