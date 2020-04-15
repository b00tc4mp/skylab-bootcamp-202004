Arroz.prototype.some = function(callback){
    for(var i = 0; i < this.length; i++){
        var result = callback(this[i], i, this)
        if (result) return true
    }
    return false
} 
