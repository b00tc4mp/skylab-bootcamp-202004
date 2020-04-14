function slice(array,element1,element2){
    var begin=element1;
    var end=0;
    var newArray=[];
    if(isNaN(element2)) {
        end=array.length;
    }else{end=element2}
    for(var i=begin;i<end;i++){
        newArray[i-begin]=array[i]
    }
    return newArray;

}