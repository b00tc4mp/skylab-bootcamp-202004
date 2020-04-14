function slice(array,initialIndex, finalIndex){
    var result=[];
    if (initialIndex === undefined){
        initialIndex = 0}
    if (initialIndex < 0){
        initialIndex = array.length + initialIndex
    }
    if (finalIndex < 0){
        finalIndex = array.length + finalIndex
    }
    for (var i = initialIndex; i < finalIndex-1; i++){
        result[result.length] = array[i]

    }
return result
}
