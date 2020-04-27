function slice(array,initValue,finalValue) {
    var arr=[]
    if(finalValue<0)finalValue+=array.length
    if(finalValue>array.length)finalValue=array.length;
    if(finalValue===undefined)finalValue=array.length;
    if(initValue>array.length)return arr;
    if(initValue===undefined)initValue=0;
    if(initValue<0)initValue+=array.length;
    for(var i=initValue;i<finalValue;i++){
        arr[arr.length]=array[i]
    }
    return arr;
    
}