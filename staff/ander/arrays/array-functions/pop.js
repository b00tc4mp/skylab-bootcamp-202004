function pop(array) {
    if(array.length===0)return undefined;
    else{
    var deleted= array[array.length-1];
    array.length=array.length-1;
    return deleted;
    }
    
}
