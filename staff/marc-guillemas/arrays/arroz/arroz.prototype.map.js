Arroz.prototype.map = function(callback) {
    
    var mappedArray = [];
    for(var i = 0; i < this.length; i++){
       var result =  callback(this[i]);
       mappedArray[i] = result;
    }

    return mappedArray;
}




