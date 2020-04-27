Arroz.prototype.filter=function (expression) {
    if (!(expression instanceof Function)) throw new TypeError( expression + ' is not a function')
    var arr=[]
    for (var i = 0; i < this.length; i++){
        if(expression(this[i])){
         arr[arr.length]= this[i]; 
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