function filter(array, expression) {
    var arr=[]
    for (var i = 0; i < array.length; i++){
        if(expression(array[i])){
         arr[arr.length]= array[i]; 
        }
    }
        
        return arr;
}
//----------------------
/* function filter(arr, callback) {
    var newArray = [];
    var index = 0;
    for(var i = 0; i < arr.length; i++) {
        if (callback(arr[i], i, arr)) {
            newArray[index] = arr[i];
            index++;
        }
    }
    return newArray;
} */