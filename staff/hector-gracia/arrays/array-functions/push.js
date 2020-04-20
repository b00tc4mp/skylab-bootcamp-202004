function push(array, element){
    if (Array.isArray(element)){
        for(var i=0;i<element.length;i++){
            array[array.length]=element[i];
        }
    }else{
        array[array.length]=element;
    }
    return array.length;
}