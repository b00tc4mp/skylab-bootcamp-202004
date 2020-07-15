function includes(array,element, index){
    var i = 0;

    if(arguments.length > 2){
        if (index >= array.length || -index >= array.length ){
            return false;
        }
        
        if(index < 0){
            i = array.length -1 + index;
        } else{
            i = index;
        }
    }

    for (i; i < array.length; i++){
        if (array[i] === element){
            return true;
        };
    };
    return false;
};