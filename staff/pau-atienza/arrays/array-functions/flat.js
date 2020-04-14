function flat(array, depth, newArray = []){
    if(arguments.length <2){
        var depth = 1;
    };
    depth -= 1;
    debugger
    for(let i =0; i<array.length; i++){
        if (array[i] === undefined){
            continue
        }
        else if(depth<0){
            debugger
            newArray[newArray.length] = array[i];
        }
        else if (typeof array[i] !== 'object'){
            
            newArray[newArray.length] = array[i];
            debugger
        }
        else{
            debugger
            flat(array[i], depth, newArray);
            debugger
        };
    };
    return newArray;
};