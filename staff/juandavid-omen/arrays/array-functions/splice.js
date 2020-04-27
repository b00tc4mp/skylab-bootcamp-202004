function splice(arrayTo, start, deleteCount){
    if (start > arrayTo.length){
        start = arrayTo.length;
        deleteCount = 0;
    }

    else if(start < 0){
        start = arrayTo.length + start

        if(start < 0) {
            start = 0;
        };
    }

    if(arguments.length <3 || arrayTo.length - start < deleteCount){
        deleteCount = arrayTo.length - start;
    }

    if(deleteCount <0){
        deleteCount = 0;
    }

    var newArray = [];

    for(var i = 0; i < start; i++){
        newArray[newArray.length] = arrayTo[i];
    }

    if(arguments.length>3){
        for(var i = 3; i < arguments.length; i++){
            newArray[newArray.length] = arguments[i];
        }
    }

    for(i = start+deleteCount; i<arrayTo.length; i++){
        newArray[newArray.length] = arrayTo[i];
    }
    
    arrayTo.length = 0;
    for (var i = 0; i < newArray.length; i++){
        arrayTo[arrayTo.length] = newArray[i]
    }
};

