function reduce(array,expresion,initialValue){
    var start=0;
    if(typeof initialValue==="undefined"){
        initialValue=0;
    }else{
        initialValue=array[0];
        start=1;
    }
    for(var i=start;i<array.length;i++){
        initialValue=expresion(initialValue,array[i]);
    }
    return initialValue;
}