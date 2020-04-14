function includes(array,element, index){
    if(arguments.length>2){
        if (index>= array.length){
            return false;
        }
        else if (-index >= array.length){
            return false;
        }
        else if(index < 0){
         var i = array.length -1 + index;
        }
        else{
            var i = index;
        }
    }
    else{
        var i = 0;
    }
    for (i; i<array.length; i++){
        if (array[i] === element){
            return true;
        };
    };
    return false;
};