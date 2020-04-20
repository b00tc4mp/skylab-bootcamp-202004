function includes(array,element,fromIndex){
    if(isNaN(fromIndex)) fromIndex=0;
    for(var i=fromIndex;i<array.length;i++){
        if(array[i]===element) return true;
    }
    return false;
}