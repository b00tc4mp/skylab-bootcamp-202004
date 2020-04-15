Arroz.prototype.reduce = function(callback, initialValue = 0){
    var result = initialValue
    for(var i = 0; i < this.length; i++){
        result = callback(result, this[i], i,  this)
    }
    return result
} 